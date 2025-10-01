from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class itemsUpload(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='items')
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    minimum_bid = models.DecimalField(max_digits=12, decimal_places=2)
    image = models.ImageField(upload_to='item_images/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_approved = models.BooleanField(default=None, null=True)

    def __str__(self):
        return self.title


class bid(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bids")
    item = models.ForeignKey(itemsUpload, on_delete=models.CASCADE, related_name="bids")
    bid_amount = models.DecimalField(max_digits=12, decimal_places=2)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-bid_amount"]  

    def __str__(self):
        return f"{self.user.username} bid Rs {self.bid_amount} on {self.item.title}"


class bidHistory(models.Model):
    bid = models.ForeignKey(bid, on_delete=models.CASCADE, related_name="history")
    old_amount = models.DecimalField(max_digits=12, decimal_places=2)
    changed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.bid.user.username} changed from Rs {self.old_amount} on {self.bid.item.title} at {self.changed_at}"


class FeedBack(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="feedback")
    item = models.ForeignKey(itemsUpload, on_delete=models.CASCADE, related_name="feedbacks")
    name = models.CharField(max_length=255)  
    likes = models.TextField(blank=True, null=True)     
    dislikes = models.TextField(blank=True, null=True)  
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback by {self.user.username} on {self.item.title}"