from django.test import TestCase
from django.core.exceptions import ValidationError
from phonenumber_field.phonenumber import PhoneNumber
from .models import CustomUser
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status



User = get_user_model()

class CustomUserModelTest(TestCase):
    def test_create_user(self):
        # Test creating a user
        user = User.objects.create_user(
            email="testuser@example.com",
            first_name="TestUser",
            last_name="Doe",
            mobile_phone="+221771234567",
            password="testpass123"

        )
        self.assertEqual(user.email, "testuser@example.com")
        self.assertTrue(user.check_password("testpass123"))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        # Test creating a superuser
        admin_user = User.objects.create_superuser(
            email="admin@example.com",
            first_name="Admin",
            last_name="User",
            mobile_phone="+221771234568",
            password="testpass123"
        )
        self.assertEqual(admin_user.email, "admin@example.com")
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)

    def test_email_is_required(self):
        # Test that email is required
        with self.assertRaises(ValueError):
            User.objects.create_user(
                email="", 
                first_name="TestUser",
                last_name="Doe",
                mobile_phone="+221771234567",
                password="testpass123"
            )

    def test_email_is_unique(self):
        # Test that email must be unique
        User.objects.create_user(
            email="testuser@example.com", 
            first_name="TestUser",
            last_name="Doe",
            mobile_phone="+221771234567",
            password="testpass123"
        )
        with self.assertRaises(ValidationError):
            user = User(
                email="testuser@example.com",
                first_name="TestUser",
                last_name="Doe",
                mobile_phone="+221771234567",
                password="testpass123"
            )
            user.full_clean()

    def test_mobile_phone_field(self):
        # Test valid phone number
        user = CustomUser.objects.create_user(
            email="testuser@example.com",
            first_name="TestUser",
            last_name="Doe",
            mobile_phone="+221771234567",
            password="testpass123",
        )
        self.assertIsInstance(user.mobile_phone, PhoneNumber)
        self.assertEqual(str(user.mobile_phone), "+221771234567")

    def test_invalid_mobile_phone(self):
        # Test invalid phone number
        with self.assertRaises(ValidationError):
            user = CustomUser(
                email="testuser@example.com", 
                first_name="TestUser",
                last_name="Doe",
                password="testpass123", 
                mobile_phone="invalid")
            user.full_clean()  # Triggers validation

    def test_blank_mobile_phone(self):
        # Test that a ValueError is raised when mobile_phone is blank
        with self.assertRaises(ValueError) as context:
            CustomUser.objects.create_user(
                email="testuser@example.com",
                first_name="TestUser",
                last_name="Doe",
                password="testpass123",
                mobile_phone=""  # Blank mobile_phone
            )
        self.assertEqual(str(context.exception), "Le numéro de téléphone mobile doit être renseigné.")

class UserListCreateViewTests(APITestCase):
    def test_register_user(self):
        url = reverse('user-list-create')
        data = {
            "email": "test@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "mobile_phone": "+221771234567",
            "password": "testpass123"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CustomUser.objects.count(), 1)


    def test_list_users(self):
        # Create a test user
        user = CustomUser.objects.create_user(
            email="test@example.com",
            first_name="John",
            last_name="Doe",
            mobile_phone="+221771234567",
            password="testpass123"
        )
        self.client.force_authenticate(user=user) 

        url = reverse('user-list-create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['email'], user.email)