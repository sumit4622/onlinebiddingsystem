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
        return f"{self.title}"
    

class bid(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bids")
    item = models.ForeignKey(itemsUpload, on_delete=models.CASCADE, related_name="bids")
    bid_amount = models.DecimalField(max_digits=12, decimal_places=2)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} bid RS {self.bid_amount} on {self.item.title}"

