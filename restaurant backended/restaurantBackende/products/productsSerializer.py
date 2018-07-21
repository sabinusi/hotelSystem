from rest_framework import serializers
from  products.models import IncredientInStore
from  products.models import WhareHouse
from .models import ProductCategory
from .models import Product
from .models import WhareHouseReport
from .models import SalesReport
from .models import SalesReportTransaction
from .models import StoreReport
from .models import ManagerAlert
from .models import OtherProducts
class IncredientSerializer(serializers.ModelSerializer):
    class Meta:
        model=IncredientInStore
        fields='__all__'
class CreateWharehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model=WhareHouse
        fields='__all__'
class NameOfIncredientInWharehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model=WhareHouse
        fields=['name']
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields= '__all__'
class ProductIncredientSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields= ['increadients']
class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model=ProductCategory
        fields='__all__'

class UpdateAvailableProductForSellSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=['avilableForSell']

class ListProductBasedOnCategorySerializer(serializers.ModelSerializer):
    product=ProductSerializer(many=True)
    class Meta:
        model=ProductCategory
        fields=['product']

class SalesReportSerializer(serializers.ModelSerializer):
    class Meta:
        model=SalesReport
        fields="__all__"
class SalesReportTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model=SalesReportTransaction
        fields="__all__"
class ViewSalesReportSerializer(serializers.ModelSerializer):
    saleid=SalesReportTransactionSerializer(many=True)
    class Meta:
        model=SalesReport
        fields=('date','time','saleid')
class StoreReportSerializer(serializers.ModelSerializer):
    class Meta:
        model=StoreReport
        fields="__all__"
class WharehouseReportSerializer(serializers.ModelSerializer):
    class Meta:
        model=WhareHouseReport
        fields="__all__"
class ManagerAlertSerailizer(serializers.ModelSerializer):
    class Meta:
        model=ManagerAlert
        fields="__all__"
class ListNumberOfProductIncredientSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=['increadients']
class MeasurableUnitsSerializer(serializers.ModelSerializer):
    class Meta:
        model=IncredientInStore
        fields=['measure_units']
class GetNameInWharehouseReportSerialzier(serializers.ModelSerializer):
    class Meta:
        model=WhareHouseReport
        fields=['inredientName']
class GetMeasurableUnitsOfIncredientSerialzier(serializers.ModelSerializer):
    class Meta:
        model=IncredientInStore
        fields=['measure_units','name']
class UpdateProductPicSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=['pic']
class UpdateProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=('price','increadients','category')
class OtherProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model=OtherProducts
        fields='__all__'
class UpdateIncredientInOtherProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model=OtherProducts
        fields=['incedient']
class UpdatePicInOtherProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model=OtherProducts
        fields=['pic']
