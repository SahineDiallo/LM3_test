import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from phonenumber_field.modelfields import PhoneNumberField

class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, mobile_phone, password=None, **extra_fields):
        """
        Crée et enregistre un utilisateur avec 
        l'email, le prénom, le nom, le numéro de téléphone mobile 
        et le mot de passe fournis.
        """

        if not email:
            raise ValueError("L'adresse email doit être renseignée.")
        if not first_name:
            raise ValueError("Le prénom doit être renseigné.")
        if not last_name:
            raise ValueError("Le nom doit être renseigné.")
        if not mobile_phone:
            raise ValueError("Le numéro de téléphone mobile doit être renseigné.")

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            mobile_phone=mobile_phone,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    

    def create_superuser(self, email, first_name, last_name, mobile_phone, password=None, **extra_fields):
        """
        Crée et enregistre un superutilisateur avec 
        l'email, le prénom, le nom, le numéro de téléphone mobile 
        et le mot de passe fournis.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Le superutilisateur doit avoir is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Le superutilisateur doit avoir is_superuser=True.")

        return self.create_user(email, first_name, last_name, mobile_phone, password, **extra_fields)
    


class AccountStatus(models.TextChoices):
    ACTIVE = "act", "Active"
    INACTIVE = "ina", "Inactive"

class Role(models.TextChoices):
    ADMIN = "admin", "Admin"
    USER = "user", "User"

class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  
    username = None
    email = models.EmailField(unique=True)
    mobile_phone = PhoneNumberField(blank=True, region="SN", verbose_name="Numero Téléphone")
    address = models.TextField(blank=True, null=True)
    account_balance = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)
    account_status = models.CharField(max_length=5, choices=AccountStatus.choices, default=AccountStatus.ACTIVE)
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.USER)
    

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "phone_number"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email