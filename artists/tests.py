from django.test import TestCase
from django.test import SimpleTestCase
from rest_framework.test import APITestCase
from django.urls import resolve, reverse
from artists.views import showallartist
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth.models import User


class ArtistUrlsTests(SimpleTestCase):
    def test_artists(self):
        url = reverse("show_artist")
        print(resolve(url))
        self.assertEquals(resolve(url).func, showallartist)
        # print(url)


class ArtistApiViewTest(APITestCase):
    artist_url = reverse("show_artist")

    def test_show_artist_auth(self):
        response = self.client.get(self.artist_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# Create your tests here.
