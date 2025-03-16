from django.db import models
import uuid
from django.conf import settings

class Currency(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=4, unique=True)
    name = models.CharField(max_length=32, blank=True)

    def __str__(self):
        return f"{self.name}'s currency"


class Categorie(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, blank=True)

class Transaction(models.Model):
    class PaymentMethod(models.TextChoices):
        VISA = "VISA", "VISA"
        WAVE = "WAVE", "WAVE"
        ORANGE_MONEY = "ORANGE_MONEY", "Orange Money"
        MASTER_CARD = "MASTER_CARD", "Master Card"
        MOBILE_MONEY = "MOBILE_MONEY", "Mobile Money"

    class TransactionStatus(models.TextChoices):
        SUCCESS = "success", "Succés"
        PENDING = "pending", "En cours"
        FAILED = "failed", "Echec"
        REFUSED = "refused", "refusée"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="transactions")
    amount = models.DecimalField(max_digits=20, decimal_places=2)
    currency = models.ForeignKey(Currency, on_delete=models.PROTECT, related_name="transactions", to_field="code")
    date = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True)
    categorie = models.ForeignKey(Categorie, on_delete=models.SET_NULL, null=True, blank=True, related_name="transactions")
    method = models.CharField(max_length=20, choices=PaymentMethod.choices)
    status = models.CharField(max_length=10, choices=TransactionStatus.choices, default=TransactionStatus.PENDING)

    def __str__(self):
        return f"{self.date}: {self.amount} {self.currency.code} ({self.status})"

    @property
    def method_color(self):
        # Associate a color with each payment method
        colors = {
            "VISA": "blue",
            "WAVE": "green",
            "ORANGE_MONEY": "orange",
            "MASTER_CARD": "red",
            "MOBILE_MONEY": "purple",
        }
        return colors.get(self.method, "gray")

