from django.urls import path, reverse, include, resolve
from django.test import SimpleTestCase
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.test import TestCase
from albums.models import Album
from songs.models import Song
from songs.views import showsong
from artists.models import Artist
from albums.serializers import AlbumSerializer
from model_bakery import baker

# Create your tests here.


class SongUrlsTests(SimpleTestCase):
    def test_songs(self):
        url = reverse("songs")
        self.assertEquals(resolve(url).func, showsong)


class ShowSongApiViewTest(APITestCase):
    url = reverse("songs")

    def setUp(self):
        self.user = User.objects.create_user(username="admin", password="admin")
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        self.artist = Artist.objects.create(
            artists="Test Artist", artist_ids="artist_test"
        )
        self.album = Album.objects.create(
            album="test", album_id="test_id", artist_ids=self.artist
        )
        Song.objects.create(
            name_song="Test Song 1",
            album_id=self.album,
            danceability=1.2,
            duration_ms=120,
            release_date="2022-02-01",
        )
        # Song.objects.create(name_song='Test Song 2', album_id=self.album,danceability=1.2)

    def test_get_customers_authenticated(self):
        response = self.client.post(
            "/api/token/", data={"username": "admin", "password": "admin"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_customers_un_authenticated(self):
        response = self.client.post(
            "/api/token/", data={"username": "admin", "password": "password"}
        )
        self.assertEquals(response.status_code, 401)

    def test_showsong_success(self):
        self.client.force_authenticate(user=self.user, token=self.token)
        data = {"album": "test"}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_showsong_album_not_found(self):
        self.client.force_authenticate(user=self.user, token=self.token)
        data = {"album": "Nonexistent Album"}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {"error": "Album not found"})
