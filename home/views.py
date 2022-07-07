from django.shortcuts import redirect, render
from django.views.generic import ListView
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import ContactForm
from django.http import HttpResponse
from django.conf import settings
from django.core.mail import BadHeaderError, send_mail

class Index(ListView):
    # 一覧するモデルを指定 -> `object_list`で取得可能
    template_name="index.html"

    def get(self, request, **kwargs):
        return render(request, self.template_name, {'form': ContactForm, 'status': 'default'})

    def post(self, request, **kwargs):
        form = ContactForm(request.POST)
        current_url = str(form.data['url'])
        temp = 'index.html'
        if current_url != '/':
            temp = current_url.strip('/')
            temp += '.html'

        if form.is_valid():
            """ 追記"""
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            sender = form.cleaned_data['sender']
            myself = form.cleaned_data['myself']
            recipients = [settings.EMAIL_HOST_USER]

            if myself:
                recipients.append(sender)
            else:
                if "" != sender:
                    return HttpResponse('無効な操作が見つかりました。')
            try:
                send_mail(subject, message, sender, recipients)
            except BadHeaderError:
                return HttpResponse('無効なヘッダーが見つかりました。')
            return render(request, temp, {'status': 'complete'})

        myself = 'True' if form.data['myself'] else 'False'
        context = {
            'subject': form.data['subject'],
            'message': form.data['message'],
            'sender': form.data['sender'],
            'myself': myself,
            'form': form,
            'status': 'error'
            }
        return render(request, temp, context)

class Mypage(ListView):
    template_name = 'mypage.html'

    def get(self, request, **kwargs):
        if not request.user.is_authenticated:
            return redirect('/login')
        return render(request, self.template_name)

class LiginView(LoginView):
    """ログインページ"""
    template_name = 'login.html'

class LogoutView(LoginRequiredMixin, LogoutView):
    """ログアウトページ"""
    template_name = 'login.html'

