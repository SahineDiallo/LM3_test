from rest_framework import serializers
from .models import Transaction, Currency, Categorie
from users.serializers import UserListSerializer

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ["id", "code", "name"]

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = ["id", "name"]

class WriteTransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = [
            "method",
            "amount",
            "currency",
            "description",
            "categorie",
        ]

class TransactionSerializer(serializers.ModelSerializer):
    currency = CurrencySerializer()
    categorie = CategorieSerializer()
    method_color = serializers.CharField(read_only=True)  # Include method_color
    user = UserListSerializer()
    class Meta:
        model = Transaction
        fields = [
            "id",
            "method",
            "method_color",
            "user",
            "date",
            "status",
            "amount",
            "currency",
            "description",
            "categorie",
        ]