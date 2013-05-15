from feincms.module.page.models import Page
from feincms.content.richtext.models import RichTextContent
from feincms.content.contactform.models import ContactFormContent

Page.register_extensions(
    # 'feincms.module.extensions.datepublisher',
    # 'feincms.module.extensions.translations',
    'feincms.module.extensions.changedate',
    'feincms.module.extensions.seo',
    'feincms.module.page.extensions.titles',
    'feincms.module.page.extensions.navigation',
    'feincms.module.page.extensions.symlinks',
)


Page.register_templates({
    'key': 'page',
    'title': 'Page',
    'path': 'content.html',
    'regions': (
        ('main', 'Main Region'),
        ('sibebar', 'Sidebar Region'),
    ),
})


Page.create_content_type(RichTextContent, regions=('main',))
Page.create_content_type(ContactFormContent, regions=('main',))
