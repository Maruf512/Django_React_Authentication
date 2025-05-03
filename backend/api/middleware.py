from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from datetime import datetime, timezone
from django.http import JsonResponse

class SimpleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        access_token_str = request.COOKIES.get('access_token')
        refresh_token_str = request.COOKIES.get('refresh_token')
        new_access_token = None

        if access_token_str:
            try:
                access_token = AccessToken(access_token_str)
                if access_token['exp'] < datetime.now(timezone.utc).timestamp():
                    raise TokenError("Access token expired")

            except TokenError:
                if refresh_token_str:
                    try:
                        refresh_token = RefreshToken(refresh_token_str)
                        new_access_token = str(refresh_token.access_token)
                        request.META['HTTP_AUTHORIZATION'] = f'Bearer {new_access_token}'
                    except TokenError:
                        return JsonResponse({'detail': 'Refresh token invalid or expired'}, status=401)
                else:
                    return JsonResponse({'detail': 'Access token expired and no refresh token provided'}, status=401)

        # Now we can access the response
        response = self.get_response(request)

        if new_access_token:
            response.set_cookie(
                'access_token',
                new_access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

        return response
