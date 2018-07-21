from django.shortcuts import render
import urllib.request as urllib2
import urllib3
import requests
import json
import base64
from  products.productsSerializer import IncredientSerializer
from  products.productsSerializer import CreateWharehouseSerializer
from rest_framework import generics
from products.models import IncredientInStore
from products.models import WhareHouse
from .productsSerializer import NameOfIncredientInWharehouseSerializer
from .productsSerializer import CategorySerializer
from .productsSerializer import ProductSerializer
from .models import ProductCategory
from .models import Product
from .models import SalesReport
from .models import WhareHouseReport
from .models import StoreReport
from .models import ManagerAlert
from .models import SalesReportTransaction
from .models import OtherProducts
from .productsSerializer import ProductIncredientSerializer
from .productsSerializer import UpdateAvailableProductForSellSerializer
from .productsSerializer import ListProductBasedOnCategorySerializer
from .productsSerializer import SalesReportSerializer
from .productsSerializer import SalesReportTransactionSerializer
from .productsSerializer import ViewSalesReportSerializer
from .productsSerializer import StoreReportSerializer
from .productsSerializer import ManagerAlertSerailizer
from .productsSerializer import WharehouseReportSerializer
from .productsSerializer import ListNumberOfProductIncredientSerializer
from .productsSerializer import MeasurableUnitsSerializer
from .productsSerializer import GetNameInWharehouseReportSerialzier
from .productsSerializer import GetMeasurableUnitsOfIncredientSerialzier
from .productsSerializer import UpdateProductPicSerializer
from .productsSerializer import UpdateProductSerializer
from .productsSerializer import OtherProductsSerializer
from .productsSerializer import UpdateIncredientInOtherProductsSerializer
from .productsSerializer import UpdatePicInOtherProductsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers

def send_sms(phone=None, message='', sender="Mobilepower"):
    data = {
        "from": sender,
        "to": phone,
        "text": message
    }
    try:

        encode = base64.b32encode(b'kacefBS:Fredrica29.')
        req = urllib2.Request('https://api.infobip.com/sms/1/text/single')
        req.add_header('Content-Type', 'application/json')
        req.add_header('Authorization', 'Basic {}'.format(encode))

        response = json.load(urllib2.urlopen(req, json.dumps(data)))
        return response
    except urllib2.HTTPError as  e:
         ResponseData = e.reason
class IncredientInStrore(generics.CreateAPIView):
    queryset = IncredientInStore
    serializer_class = IncredientSerializer
class CreateWharehouse(generics.CreateAPIView):
    queryset = WhareHouse
    serializer_class = CreateWharehouseSerializer
class ListIncredientInstore(generics.ListAPIView):
    queryset = IncredientInStore.objects.all()
    serializer_class = IncredientSerializer

class ListSpecificIncredientInstore(generics.RetrieveAPIView):
    queryset = IncredientInStore.objects.all()
    serializer_class = IncredientSerializer
    lookup_field = 'name'

class UpdateSpecificIncredientInstore(generics.UpdateAPIView):
    queryset = IncredientInStore.objects.all()
    serializer_class = IncredientSerializer
    lookup_field = 'name'
class DeleteSpecificIncredientInstore(generics.DestroyAPIView):
    queryset = IncredientInStore.objects.all()
    serializer_class = IncredientSerializer
    lookup_field = 'name'
class DeleteSpecificIncredientWharehouse(generics.DestroyAPIView):
    queryset = WhareHouse.objects.all()
    serializer_class = CreateWharehouseSerializer
    lookup_field = 'name'
class RetriveWharehouseName(generics.RetrieveAPIView):
    queryset = WhareHouse.objects.all()
    serializer_class = NameOfIncredientInWharehouseSerializer
    lookup_field = 'name'
class ListWhareHouseData(generics.ListAPIView):
    queryset = WhareHouse.objects.all()
    serializer_class = CreateWharehouseSerializer
class RetriveSpecificWharehouseName(generics.RetrieveAPIView):
    queryset = WhareHouse.objects.all()
    serializer_class = CreateWharehouseSerializer
    lookup_field = 'name'
class UpdateSpecificIncredientInWhareHouse(generics.UpdateAPIView):
    queryset = WhareHouse.objects.all()
    serializer_class = CreateWharehouseSerializer
    lookup_field = 'name'
class Category(generics.CreateAPIView):
    queryset = ProductCategory
    serializer_class = CategorySerializer

class ListCategory(generics.ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = CategorySerializer
class RetriveCategory(generics.RetrieveAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'name'
class UpdateCategory(generics.UpdateAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'name'

class ListProduct(generics.ListAPIView):

    queryset = Product.objects.all()

    serializer_class = ProductSerializer

class ListProductForSell(generics.ListAPIView):

    queryset = Product.objects.filter(avilableForSell__gte=1)
    serializer_class = ProductSerializer
class CreateProduct(generics.CreateAPIView):
    queryset = Product
    serializer_class = ProductSerializer
class RetrivewProduct(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'name'
class UpdateIncredientProduct(generics.UpdateAPIView):
    queryset = Product
    serializer_class = ProductIncredientSerializer
    lookup_field = 'name'
class DeleteCategory(generics.DestroyAPIView):
    queryset = ProductCategory
    serializer_class = CategorySerializer
    lookup_field = 'name'
class DeleteProduct(generics.DestroyAPIView):
    queryset = Product
    serializer_class = ProductSerializer
    lookup_field = 'name'
class ObjectSerializer(serializers.ModelSerializer):
    class meta:
        model=Product
        fields="__all__"
class UpdateAvailableProductForSell(APIView):
    def get(self, request):
        name=self.request.query_params.get('name',None)
        value=self.request.query_params.get('value',None)
        if  name is not  None and value is not None:
            query=Product.objects.get(name=name)
            if query.avilableForSell >0:
                query.avilableForSell=float(value)+query.avilableForSell
                query.save()
            else:
                query.avilableForSell=value
                query.save()
            return Response('succesfull')

        else: return Response('wrong parameter')
class UpdateAvailableProductForSellFromPOS(APIView):
    def get(self, request):
        name=self.request.query_params.get('name',None)
        value=self.request.query_params.get('value',None)
        if  name is not  None and value is not None:
            query=Product.objects.get(name=name)
            query.avilableForSell=query.avilableForSell-int(value)
            query.save()
            return Response('succesfull')

        else: return Response('wrong parameter')

class UpdateAvailabiltyInStore(APIView):
    def get(self,request):
        name = self.request.query_params.get('name', None)
        value = self.request.query_params.get('value', None)
        if name is not None and value is not None:
            query=IncredientInStore.objects.get(name=name)
            if query.availableUnits > int(value):
                query.availableUnits=query.availableUnits-int(value)
                query.save()

                return Response('succesfull')
            else:return Response({name +'is out of stock'})
        else:return Response('failed with paremeters')

class ListProductBasedOnCategory(generics.RetrieveAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ListProductBasedOnCategorySerializer
    lookup_field = 'name'
class CreateSalesReport(generics.CreateAPIView):
    queryset = SalesReport
    serializer_class = SalesReportSerializer
class CreateSalesReportTransaction(generics.CreateAPIView):
    queryset = SalesReportTransaction
    serializer_class = SalesReportTransactionSerializer
class ViewSalesReport(generics.ListAPIView):
    queryset = SalesReport.objects.all()
    serializer_class = ViewSalesReportSerializer
class CreateStoreReport(generics.CreateAPIView):
    queryset = StoreReport
    serializer_class = StoreReportSerializer
class ViewStoreReport(generics.ListAPIView):
    queryset = StoreReport.objects.all()
    serializer_class = StoreReportSerializer
class WharehouseReport(generics.CreateAPIView):
    queryset = WhareHouseReport
    serializer_class=WharehouseReportSerializer
class ViewWhareHouseReport(generics.ListAPIView):
    queryset = WhareHouseReport.objects.all()
    serializer_class = WharehouseReportSerializer
class ViewSalesReportDependOnDate(generics.ListAPIView):
    def get_queryset(self):
     start =  self.request.query_params.get('start', None)
     end =  self.request.query_params.get('end', None)
     if start is not None and end is not None:
         queryset=SalesReport.objects.filter(daten__range=(start,end))
         return queryset;
    serializer_class = ViewSalesReportSerializer
class ViewWhareHouseReportDependOnDate(generics.ListAPIView):
    def get_queryset(self):
     start =  self.request.query_params.get('start', None)
     end =  self.request.query_params.get('end', None)
     if start is not None and end is not None:
         queryset=WhareHouseReport.objects.filter(daten__range=(start,end))
         return queryset;
    serializer_class = WharehouseReportSerializer
class ViewStoreReportDependOnDate(generics.ListAPIView):
    def get_queryset(self):
     start =  self.request.query_params.get('start', None)
     end =  self.request.query_params.get('end', None)
     if start is not None and end is not None:
         queryset=StoreReport.objects.filter(daten__range=(start,end))
         return queryset;
    serializer_class = StoreReportSerializer
class CreateManagerAlert(generics.CreateAPIView):
    queryset =ManagerAlert
    serializer_class = ManagerAlertSerailizer
class ViewManagerAlert(generics.ListAPIView):
    queryset =ManagerAlert.objects.all()
    serializer_class = ManagerAlertSerailizer
class SendSms(APIView):
    def get(self,request):
        a=2
        if a is 2:

            send_sms(bytearray(2557696807),message='s')
            return Response('succes')
class ListNumberOfProductIncredient(generics.RetrieveAPIView):
    queryset = Product
    serializer_class = ListNumberOfProductIncredientSerializer
    lookup_field = 'name'
class UpdateManagerAlert(generics.UpdateAPIView):
    queryset = ManagerAlert
    serializer_class = ManagerAlertSerailizer
    lookup_field = 'phoneNumber'
class DeleteManagerAlert(generics.DestroyAPIView):
    queryset = ManagerAlert
    serializer_class = ManagerAlertSerailizer
    lookup_field = 'phoneNumber'
class UpdateMeasurebleUnitsInStore(generics.UpdateAPIView):
    queryset = IncredientInStore
    serializer_class = MeasurableUnitsSerializer
    lookup_field = 'name'
class GetNameInWharehouseReport(generics.ListAPIView):
    def get_queryset(self):
        name=self.request.query_params.get('name', None)
        if name is not None:
            queryset=WhareHouseReport.objects.filter(inredientName=name)
            return queryset

    serializer_class = GetNameInWharehouseReportSerialzier
class GetMeasurableUnitsOfIncredient(generics.RetrieveAPIView):
    queryset = IncredientInStore
    serializer_class = GetMeasurableUnitsOfIncredientSerialzier
    lookup_field = 'name'
class UpdateProduct(generics.UpdateAPIView):
    queryset = Product
    serializer_class = UpdateProductSerializer
    lookup_field = "name"
class UpdateProductPic(generics.UpdateAPIView):
    queryset = Product
    serializer_class = UpdateProductPicSerializer
    lookup_field = "name"
class CreateOtherProducts(generics.CreateAPIView):
    queryset =OtherProducts
    serializer_class = OtherProductsSerializer
class ListOtherProducts(generics.ListAPIView):
    queryset =OtherProducts.objects.all()
    serializer_class = OtherProductsSerializer
class UpdateOtherProducts(generics.UpdateAPIView):
    queryset =OtherProducts
    serializer_class = OtherProductsSerializer
    lookup_field = 'name'
class UpdateIncredientInOtherProducts(generics.UpdateAPIView):
    queryset =OtherProducts
    serializer_class = UpdateIncredientInOtherProductsSerializer
    lookup_field = 'name'
class ListIncredientInOtherProducts(generics.ListAPIView):
    queryset =OtherProducts.objects.all()
    serializer_class = UpdateIncredientInOtherProductsSerializer
    lookup_field = 'name'
class RetriveOtherProduct(generics.RetrieveAPIView):
    queryset = OtherProducts.objects.all()
    serializer_class = OtherProductsSerializer
    lookup_field = 'name'
class deleteOtherProduct(generics.DestroyAPIView):
    queryset = OtherProducts.objects.all()
    serializer_class = OtherProductsSerializer
    lookup_field = 'name'

class UpdatePicInOtherProducts(generics.UpdateAPIView):
    queryset =OtherProducts
    serializer_class = UpdatePicInOtherProductsSerializer
    lookup_field = 'name'