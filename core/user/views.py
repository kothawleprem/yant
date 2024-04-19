import random
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .utils import send_otp


class EmailView(APIView):
    def post(self, request):
        email = request.data.get("email")
        otp = random.randint(1000, 9999)
        password_ = str(otp)
   
        is_registered = User.objects.filter(email=email)
        if not is_registered:
            user = User.objects.create_user(username=email, email=email,
                                            password=password_)
            user.save()
        else:
            user = is_registered[0]
            user.set_password(password_)
            user.save()
     
        # Send OTP to email
        send_otp(email, otp)
    
        response = {"message": f"OTP Sent Successfully {otp}"}
        return Response(response, status=status.HTTP_200_OK)


class VerifyEmailView(APIView):
    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")
        
        try:
            user = User.objects.get(email=email)
            user_ = authenticate(request, username=email, password=str(otp))
            
            if not user_:
                return Response({"message": "Incorrect OTP"},
                                status=status.HTTP_401_UNAUTHORIZED)
            
            old_tokens = Token.objects.filter(user=user)
            old_tokens.delete()
            token = Token.objects.create(user=user)
            
            response = {
                "email": email,
                "token": token.key,
                "user_id": user.id
            }
            return Response(response, status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            return Response({"message": "User does not exist"},
                            status=status.HTTP_404_NOT_FOUND)


class TokenVerifyView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        response = {
            "user_id": user.id
        }
        return Response(response, status=status.HTTP_200_OK)

