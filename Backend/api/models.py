from django.db import models

# Create your models here.

# class userRegister(models.Model):
#     firstname = models.CharField( max_length=50)
#     lastname = models.CharField( max_length=50)
#     email = models.CharField( max_length=250, unique = True, )
#     username = models.CharField( max_length=50, unique = True)
#     password =models.CharField( max_length=50)

# class loginUser(models.Model):
#     username = models.CharField( max_length=50, unique = True)

class itemsUpload(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    minimum_bid = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='item_images/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title