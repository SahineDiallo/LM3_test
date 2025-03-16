from django.shortcuts import render

from rest_framework import viewsets, pagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Transaction, Currency, Categorie
from .serializers import TransactionSerializer, CurrencySerializer, CategorieSerializer, WriteTransactionSerializer
from users.models import CustomUser


class CurrencyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer

class CategorieViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer

class TransactionPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = TransactionPagination

    def get_serializer_class(self):
        if self.action in ("get", "list", "retrieve"):
            return TransactionSerializer
        return WriteTransactionSerializer

    def get_queryset(self):
        user = self.request.user
        user_id = self.kwargs.get("user_id")
        default_queryset = Transaction.objects.select_related("user", "currency", "categorie").order_by("-date")
        if user.role == "admin":
            if user_id:
                return default_queryset.filter(user_id=user_id)
            return default_queryset
        return default_queryset.filter(user=user)

    @action(detail=False, methods=["post"])
    def create_user_transaction(self, request, user_id=None):
        transaction_owner = CustomUser.objects.get(id=user_id)
        print("request.data", request.data)
        user = self.request.user
        if user.role != "admin":
            return Response({"detail": "Desolé mais vous n'avez la permission pour effectuer cette transaction."}, status=403)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=transaction_owner)
        return Response(serializer.data, status=201)

    @action(detail=False, methods=["get"])
    def list_user_transactions(self, request, user_id=None):
        user = self.request.user
        transactions = self.get_filtered_transactions(user)
        print("filtered")
        
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    def get_filtered_transactions(self, user):
        transactions = Transaction.objects.select_related("user", "currency", "categorie").order_by("-date")
        if user.role != "admin":
            transactions = transactions.filter(user=user)
        return transactions
