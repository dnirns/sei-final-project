
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/drawings/', include('drawings.urls')),
    path('api/auth/', include('jwt_auth.urls'))
]
