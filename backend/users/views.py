from rest_framework import generics, permissions
from .serializers import CustomUserSerializer
from django.db.models import Q
from .models import CustomUser
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserListSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class IsAuthenticatedOrRegister(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True 
        return request.user and request.user.is_authenticated

class UserListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrRegister] 

    def get_queryset(self):
        queryset = CustomUser.objects.all().order_by('email')
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(
                Q(email__icontains=search_query) |
                Q(first_name__icontains=search_query) |
                Q(last_name__icontains=search_query)
            )
        return queryset

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CustomUserSerializer
        return UserListSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == status.HTTP_200_OK:
            # Get the user from the validated token
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.user

            # Add user details to the response
            response.data['user'] = {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'mobile_phone': str(user.mobile_phone),
                'is_admin': user.role == 'admin',
            }
        
        return response


