from rest_framework.views import APIView # API View Class
from rest_framework.response import Response # get response class

from .models import Drawing
from .serializers import DrawingSerializer # get drawing serializer


# views

# all drawings
class DrawingListView(APIView):
    def get(self, _request):
            drawing = Drawing.objects.all() # get all the books
            serializer = DrawingSerializer(drawing, many=True)
            return Response(serializer.data) # send the JSON to the client
# detail view for individual drawing

class DrawingDetailView(APIView):

    def get(self, _request, pk):
        drawing = Drawing.objects.get(pk=pk) # get drawing by id (pk)
        serializer = DrawingSerializer(drawing)
        return(Response.serializer.data) # send back JSON
