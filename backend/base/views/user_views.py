from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response

from ..Serializers import UserSerializer,UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from ..models import User

from django.contrib.auth.hashers import make_password
from rest_framework import status


@api_view(['POST'])
def registerUser(request):
    data=request.data 
    try:
        user=User.objects.create(
        first_name=data['name'],
        username=data['email'],
        email=data['email'],
        password=make_password(data['password'])
        )
        serializer=UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except:
        message={'detail':" user with this Email already exists"}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes( [IsAuthenticated] )
def getUserProfile(request):#we wil take the user data from token 
    user=request.user
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes( [IsAuthenticated] )
def updateUserProfile(request):#we wil take the user data from token 
    user=request.user
    serializer=UserSerializerWithToken(user,many=False)
    data=request.data 
    user.first_name=data['name']
    user.username=data['name']
    user.email=data['email']

    if data['password']!='':
        user.password=make_password(data['password'])

    user.save()    
    return Response(serializer.data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self,attrs):
        data=super().validate(attrs)
       
        serializer=UserSerializerWithToken(self.user).data
        for k,v in serializer.items(): #data['email']=self.user.email
            data[k]=v
            
        return data
    
class MyTokenObtainPairView(TokenObtainPairView) :
    serializer_class = MyTokenObtainPairSerializer #return user data 



@api_view(['GET'])
@permission_classes( [IsAdminUser])
def getUsers(request):
    users=User.objects.all()
    serializer=UserSerializer(users,many=True)
    return Response(serializer.data)

