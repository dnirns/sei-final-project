from rest_framework import serializers
from .models import Drawing
from jwt_auth.serializers import UserSerializer



class DrawingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Drawing
        fields = '__all__'



# NEW !!
class PopulatedDrawingSerializer(DrawingSerializer):
    owner = UserSerializer()
