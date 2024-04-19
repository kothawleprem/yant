from django.urls import path
from .views import EmailView, VerifyEmailView, TokenVerifyView


urlpatterns = [
    path('email/', EmailView.as_view(), name="email"),
    path('verify_email/', VerifyEmailView.as_view(), name="verify-email"),
    path('verify_token/', TokenVerifyView.as_view(), name="verify-token"),
    
]
