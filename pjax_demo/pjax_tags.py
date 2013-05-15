from django import template
from django.utils import simplejson
from django.utils.safestring import mark_safe

register = template.Library()


@register.filter_function
def pjax(request, tpl):
    if request.is_ajax():
        return "base_pjax.html"
    else:
        return tpl


@register.filter_function
def jsonify(object):
    return mark_safe(simplejson.dumps(object))
