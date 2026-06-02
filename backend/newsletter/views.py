from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import NewsletterSubscriber, PopupBanner
from .serializers import NewsletterSubscriberSerializer, PopupBannerSerializer


class SubscribeView(APIView):
    """POST /api/subscribe/ — save email to DB"""

    def post(self, request):
        serializer = NewsletterSubscriberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Successfully subscribed!', 'data': serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {'message': 'Subscription failed.', 'errors': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


class PopupBannerView(APIView):
    """GET /api/popup/ — fetch active popup banner data"""

    def get(self, request):
        banner = PopupBanner.objects.filter(is_active=True).first()
        if banner:
            serializer = PopupBannerSerializer(banner, context={'request': request})
            return Response(serializer.data)
        return Response({'message': 'No active popup'}, status=status.HTTP_404_NOT_FOUND)
