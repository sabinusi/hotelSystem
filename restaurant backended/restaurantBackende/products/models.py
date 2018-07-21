from django.db import models

from django.contrib.auth.models import User


class ProductCategory(models.Model):
    name=models.CharField(primary_key=True,max_length=100)
    pic=models.ImageField(blank=True,null=True,upload_to='category_pics')

    def __str__(self):
        return self.name
class IncredientInStore(models.Model):
    UNIT_CHOICES = (
        ('_Kg', '_Kg'),
        ('_Lt', '_Lt'),
        ('_Count', '_Count'),
        ('_Mkungu', '_Mkungu'),
    )

    name=models.CharField(primary_key=True,max_length=100)
    normal_units=models.IntegerField()
    measure_units=models.CharField(choices=UNIT_CHOICES,max_length=10)

    availableUnits=models.IntegerField()

    def __str__(self):
        return self.name
class Product(models.Model):
    name=models.CharField(primary_key=True,max_length=100)
    category=models.ForeignKey(ProductCategory,related_name='product',on_delete=models.SET_NULL,null=True)
    pic=models.ImageField(blank=True,null=True,upload_to='product_pics')
    price=models.IntegerField(default=0)
    avilableForSell=models.IntegerField(default=0)
    increadients=models.ManyToManyField(IncredientInStore,blank=True)

    def __str__(self):
        return self.name
class WhareHouse(models.Model):
    name=models.CharField(primary_key=True,max_length=100)
    normalrange=models.IntegerField(default=0)
    available=models.IntegerField(default=0)
class SalesReport(models.Model):
    date=models.DateTimeField(auto_now_add=True)
    daten=models.DateField(auto_now_add=True,null=True)
    time=models.TimeField(auto_now_add=True)
    def __str__(self):
        return '%s' % (self.id)
class SalesReportTransaction(models.Model):
    saleid=models.ForeignKey(SalesReport,on_delete=models.CASCADE,related_name='saleid')
    product=models.CharField(max_length=70)
    price=models.IntegerField()
class StoreReport(models.Model):
    STATUSCHOICES=(
        ('CREATED', 'CREATED'),
        ('REMOVED', 'REMOVED'),
        ('REDUCED', 'REDUCED'),
        ('ADDED', 'ADDED'),
    )
    inredientName = models.CharField(max_length=70)
    status=models.CharField(choices=STATUSCHOICES,max_length=50)
    amount=models.CharField(default=0,max_length=50)
    reasons=models.CharField(max_length=50)
    daten=models.DateField(auto_now_add=True,null=True)
    date=models.DateTimeField(auto_now_add=True,null=True)
    time = models.TimeField(auto_now_add=True, null=True)

    def __str__(self):
        return  self.status
class WhareHouseReport(models.Model):
    STATUSCHOICES = (
        ( 'CREATED','CREATED',),
        ('REMOVED','REMOVED', ),
        ('REDUCED','REDUCED'),
        ( 'ADDED','ADDED'),
        ( 'CHANGES','CHANGES'),
    )
    REASONSCHOICES = (
        ( 'CREATED AFRER CREATE IN STORE','CREATED AFRER CREATE IN STORE',),
        ('REMOVED ONLY FROM WHAREHOUSE','REMOVED ONLY FROM WHAREHOUS', ),
        ( 'REMOVED AFTER REMOVED IN STORE','REMOVED AFTER REMOVED IN STORE'),
        ( 'NCREADIENT ADDED TO STORE','NCREADIENT ADDED TO STORE'),
        ('INCREASE DIRECT','INCREASE DIRECT'),
        ('MAKE CHANGES TO BOTH NORMAL AND AVAILABLE UNITS','MAKE CHANGES TO BOTH NORMAL AND AVAILABLE UNITS'),
        ('CREATED AGAIN AFTER EDIT IN STORE','CREATED AGAIN AFTER EDIT IN STORE'),
        ('CREATED NEW AFTER EDIT IN STORE','CREATED NEW AFTER EDIT IN STORE'),
        ('MAKE CHANGE TO NORMAL UNITS','MAKE CHANGE TO NORMAL UNITS'),
    )

    inredientName=models.CharField(max_length=70)
    status = models.CharField(choices=STATUSCHOICES, max_length=50)
    normalBefore = models.CharField(default="___",max_length=50)
    normalAfter = models.CharField(default="___",max_length=50)
    availableBefore = models.CharField(default="___",max_length=50)
    availableAfter= models.CharField(default="___",max_length=50)
    reasons = models.CharField(choices=REASONSCHOICES, max_length=50)
    daten=models.DateField(auto_now_add=True,null=True)
    date=models.DateTimeField(auto_now_add=True,null=True)



    def __str__(self):
        return self.status
class ManagerAlert(models.Model):
    ROLECHOICE=(
        ('STORE', 'STORE',),
        ('WHAREHOUSE', 'WHAREHOUSE',),
        ('SUPER', 'SUPER',),
    )

    name=models.CharField(max_length=100)
    phoneNumber=models.CharField(max_length=50,primary_key=True)
    role=models.CharField(choices=ROLECHOICE,max_length=50)
    def __str__(self):
        return self.name
class OtherProducts(models.Model):
    name=models.CharField(max_length=70)
    pic = models.ImageField(blank=True, null=True, upload_to='othersProducts')
    incedient=models.ManyToManyField(IncredientInStore,blank=True)

