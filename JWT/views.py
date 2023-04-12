from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.


def Routes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    return JsonResponse(routes, safe=False)
