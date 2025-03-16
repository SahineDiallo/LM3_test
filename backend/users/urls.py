from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserListCreateView, UserRetrieveUpdateDestroyView, CustomTokenObtainPairView

urlpatterns = [
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<uuid:id>/', UserRetrieveUpdateDestroyView.as_view(), name='user-retrieve-update-destroy'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]