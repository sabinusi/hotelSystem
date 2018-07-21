from django.contrib import admin
from products.models import WhareHouse
from products.models import Product
from products.models import IncredientInStore
from products.models import ProductCategory
from products.models import SalesReport
from products.models import StoreReport
from products.models import WhareHouseReport
from products.models import SalesReportTransaction
from products.models import ManagerAlert
from products.models import OtherProducts

class OtherProductsAdmin(admin.ModelAdmin):
    list_display = ('name','pic')
    search_fields = ['name']
class ManagerAlertAdmin(admin.ModelAdmin):
    list_display = ('name','phoneNumber','role')
    search_fields = ['name']


class WhareHouseAdmin(admin.ModelAdmin):
    list_display = ('name','available')
    search_fields = ('name','available')
class IncredientInStoreAdmin(admin.ModelAdmin):
    list_display=('name','normal_units','measure_units','availableUnits')
    search_fields = ('name',)
class ProductAdmin(admin.ModelAdmin):

    list_display = ('name','price','category','avilableForSell')
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('saleid','product','price')
admin.site.register(SalesReportTransaction,TransactionAdmin)
class SalesReportAdmin(admin.ModelAdmin):
    list_display = ('id','date','time')
admin.site.register(SalesReport,SalesReportAdmin)
class WharehouseReportAdmin(admin.ModelAdmin):
    list_display = ('id','date','inredientName','status','normalAfter','normalBefore','availableBefore','availableAfter','reasons')
admin.site.register(WhareHouseReport,WharehouseReportAdmin)
class StoreReportAdmin(admin.ModelAdmin):

    list_display = ('date','inredientName','status','amount','reasons')
admin.site.register(StoreReport,StoreReportAdmin)
admin.site.register(WhareHouse,WhareHouseAdmin)
admin.site.register(IncredientInStore,IncredientInStoreAdmin)
admin.site.register(ProductCategory)
admin.site.register(Product,ProductAdmin)
admin.site.register(ManagerAlert,ManagerAlertAdmin)
admin.site.register(OtherProducts,OtherProductsAdmin)

