from django.test import TestCase
from django.test import SimpleTestCase
from rest_framework.test import APITestCase, APIClient
from django.urls import resolve, reverse
from albums.views import showalbums
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth.models import User

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from albums.models import Album
from artists.models import Artist
from albums.serializers import AlbumSerializer
from model_bakery import baker


class AlbumUrlsTests(SimpleTestCase):
    def test_album(self):
        url = reverse("show_album")
        print(resolve(url))
        self.assertEquals(resolve(url).func, showalbums)


class ShowAlbumsApiViewTest(APITestCase):
    url = reverse("show_album")

    def setUp(self):
        self.user = User.objects.create_user(username="admin", password="admin")
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        self.artist = Artist.objects.create(
            artists="test_artist", artist_ids="artist_test"
        )
        self.album = Album.objects.create(
            album="test", album_id="test_id", artist_ids=self.artist
        )

    def test_get_customers_authenticated(self):
        response = self.client.post(
            "/api/token/", data={"username": "admin", "password": "admin"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_customers_un_authenticated(self):
        self.client.force_authenticate(user=None, token=None)
        response = self.client.post(
            "/api/token/", data={"username": "admin", "password": "password"}
        )
        self.assertEquals(response.status_code, 401)

    def test_showalbums_valid_artist(self):
        self.client.force_authenticate(user=self.user, token=self.token)
        data = {"artists": "test_artist"}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_showalbums_invalid_artist(self):
        self.client.force_authenticate(user=self.user, token=self.token)
        data = {"artists": "Third Day"}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 404)
