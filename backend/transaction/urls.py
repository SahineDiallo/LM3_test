from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet, CurrencyViewSet, CategorieViewSet

router = DefaultRouter()
router.register(r"transactions", TransactionViewSet, basename="transaction")
router.register(r"currencies", CurrencyViewSet)
router.register(r"categories", CategorieViewSet)

urlpatterns = [
    path("api/users/<uuid:user_id>/", include(router.urls)),
] + router.urls

