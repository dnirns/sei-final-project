from rest_framework.views import APIView # API View Class
from rest_framework.response import Response # get response class
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Drawing
from .serializers import DrawingSerializer, PopulatedDrawingSerializer # get drawing serializer



# all drawings
class DrawingListView(APIView):

    # NEW !!
    permission_classes = (IsAuthenticatedOrReadOnly, )
    # END OF NEW !!

    def get(self, _request):
            drawings = Drawing.objects.all() # get all the books
            serialized_drawings = PopulatedDrawingSerializer(drawings, many=True)
            return Response(serialized_drawings.data, status=status.HTTP_200_OK) # send the JSON to the client

# NEW !!!
    def post(self, request):
            request.data['owner'] = request.user.id
            new_drawing = DrawingSerializer(data=request.data)
            if new_drawing.is_valid():
                new_drawing.save()
                return Response(new_drawing.data, status=status.HTTP_201_CREATED)
            return Response(new_drawing.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class DrawingDetailView(APIView):

    permisison_classes = (IsAuthenticatedOrReadOnly)
    def get_drawing(self, pk):
        try:
            return Drawing.objects.get(pk=pk)
        except Drawing.DoesNotExist:
            raise NotFound()

    def is_drawing_owner(self, drawing, user):
        if drawing.owner.id != user.id:
            raise PermissionDenied()

    def get(self, _request, pk):
        drawing = self.get_drawing(pk)
        serialized_drawing = PopulatedDrawingSerializer(drawing)
        return Response(serialized_drawing.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        drawing_to_update = self.get_drawing(pk=pk)
        self.is_drawing_owner(drawing_to_update, request.user)
        updated_drawing = DrawingSerializer(drawing_to_update, data=request.data)
        if updated_drawing.is_valid():
            updated_drawing.save()
            return Response(updated_drawing.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_drawing.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        drawing_to_delete = self.get_drawing(pk=pk)
        self.is_drawing_owner(drawing_to_delete, request.user)
        drawing_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#END OF NEW
