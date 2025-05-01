from .views import get_notes, CustomTokenObtainPairView, CustomRefreshTokenView, logout
from django.urls import path


urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('notes/', get_notes, name='get_notes'),
    path('logout/', logout, name='logout'),
]