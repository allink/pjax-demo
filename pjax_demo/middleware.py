from django.http import HttpResponse
from django.utils import simplejson as json
from django.utils.cache import patch_cache_control, patch_vary_headers


class PJAXMiddleware(object):
    def process_response(self, request, response):
        if request.is_ajax() and response.status_code in (301, 302):
            return HttpResponse(json.dumps({
                'location': response['Location'],
                'status_code': response.status_code,
                'redirect': True,
            }))
        if hasattr(request, "_feincms_page"):
            patch_cache_control(response, max_age=60)
            patch_vary_headers(response, ['Accept', 'X-Requested-With'])
        return response

    def process_request(self, request):
        if request.path.startswith('/_pjax/'):
            request.path = request.path[6:]
            request.path_info = request.path  # used by urls.py
