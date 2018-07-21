from django.conf.urls import url
from .views import IncredientInStrore
from .views import CreateWharehouse
from .views import ListIncredientInstore
from .views import ListSpecificIncredientInstore
from .views import UpdateSpecificIncredientInstore
from .views import DeleteSpecificIncredientInstore
from .views import DeleteSpecificIncredientWharehouse
from .views import RetriveWharehouseName
from .views import ListWhareHouseData
from .views import RetriveSpecificWharehouseName
from .views import UpdateSpecificIncredientInWhareHouse
from .views import Category
from .views import ListCategory
from .views import ListProduct
from .views import RetriveCategory
from .views import UpdateCategory
from .views import CreateProduct
from .views import RetrivewProduct
from .views import UpdateIncredientProduct
from .views import DeleteCategory
from .views import DeleteProduct
from .views import UpdateAvailableProductForSell
from .views import UpdateAvailabiltyInStore
from .views import ListProductBasedOnCategory
from .views import CreateSalesReport
from .views import CreateSalesReportTransaction
from .views import ViewSalesReport
from .views import CreateStoreReport
from .views import ViewStoreReport
from .views import WharehouseReport
from .views import ViewWhareHouseReport
from .views import ViewSalesReportDependOnDate
from .views import ViewWhareHouseReportDependOnDate
from .views import ViewStoreReportDependOnDate
from .views import CreateManagerAlert
from .views import ViewManagerAlert
from .views import SendSms
from .views import ListNumberOfProductIncredient
from .views import UpdateManagerAlert
from .views import DeleteManagerAlert
from .views import UpdateMeasurebleUnitsInStore
from .views import GetNameInWharehouseReport
from .views import GetMeasurableUnitsOfIncredient
from .views import UpdateProduct
from .views import UpdateProductPic
from .views import ListProductForSell
from .views import UpdateAvailableProductForSellFromPOS
from .views import CreateOtherProducts
from .views import ListOtherProducts
from .views import UpdateOtherProducts
from .views import UpdateIncredientInOtherProducts
from .views import ListIncredientInOtherProducts
from .views import RetriveOtherProduct
from .views import deleteOtherProduct
from .views import UpdatePicInOtherProducts




urlpatterns = [
url(r'^UpdatePicInOtherProducts/(?P<name>[\w-]+)', UpdatePicInOtherProducts.as_view()),
url(r'^deleteOtherProduct/(?P<name>[\w-]+)', deleteOtherProduct.as_view()),
url(r'^RetriveOtherProduct/(?P<name>[\w-]+)', RetriveOtherProduct.as_view()),
url(r'^ListIncredientInOtherProducts/(?P<name>[\w-]+)', ListIncredientInOtherProducts.as_view()),
url(r'^UpdateIncredientInOtherProducts/(?P<name>[\w-]+)', UpdateIncredientInOtherProducts.as_view()),
url(r'^UpdateOtherProducts/(?P<name>[\w-]+)', UpdateOtherProducts.as_view()),
url(r'^ListOtherProducts', ListOtherProducts.as_view()),
url(r'^CreateOtherProducts', CreateOtherProducts.as_view()),
url(r'^UpdateAvailableProductForSellFromPOS', UpdateAvailableProductForSellFromPOS.as_view()),
url(r'^ListProductForSell', ListProductForSell.as_view()),
url(r'^UpdateProductPic/(?P<name>[\w-]+)', UpdateProductPic.as_view()),
url(r'^UpdateProduct/(?P<name>[\w-]+)', UpdateProduct.as_view()),
url(r'^GetMeasurableUnitsOfIncredient/(?P<name>[\w-]+)', GetMeasurableUnitsOfIncredient.as_view()),
url(r'^GetNameInWharehouseReport', GetNameInWharehouseReport.as_view()),
url(r'^UpdateMeasurebleUnitsInStore/(?P<name>[\w-]+)', UpdateMeasurebleUnitsInStore.as_view()),
url(r'^DeleteManagerAlert/(?P<phoneNumber>[\w-]+)', DeleteManagerAlert.as_view()),
url(r'^UpdateManagerAlert/(?P<phoneNumber>[\w-]+)', UpdateManagerAlert.as_view()),
url(r'^ListNumberOfProductIncredient/(?P<name>[\w-]+)', ListNumberOfProductIncredient.as_view()),
url(r'^SendSms', SendSms.as_view()),
url(r'^ViewManagerAlert', ViewManagerAlert.as_view()),
url(r'^CreateManagerAlert', CreateManagerAlert.as_view()),
url(r'^ViewStoreReportDependOnDate', ViewStoreReportDependOnDate.as_view()),
url(r'^ViewWhareHouseReportDependOnDate', ViewWhareHouseReportDependOnDate.as_view()),
url(r'^ViewSalesReportDependOnDate', ViewSalesReportDependOnDate.as_view()),
url(r'^ViewWhareHouseReport', ViewWhareHouseReport.as_view()),
url(r'^WharehouseReport', WharehouseReport.as_view()),
url(r'^ViewStoreReport', ViewStoreReport.as_view()),
url(r'^CreateStoreReport', CreateStoreReport.as_view()),
url(r'^ViewSalesReport', ViewSalesReport.as_view()),
url(r'^CreateSalesReportTransaction', CreateSalesReportTransaction.as_view()),
url(r'^CreateSalesReport', CreateSalesReport.as_view()),
url(r'^ListProductBasedOnCategory/(?P<name>[\w-]+)', ListProductBasedOnCategory.as_view()),
url(r'^UpdateAvailableProductForSell', UpdateAvailableProductForSell.as_view()),
url(r'^UpdateAvailabiltyInStore', UpdateAvailabiltyInStore.as_view()),
url(r'^DeleteProduct/(?P<name>[\w-]+)', DeleteProduct.as_view()),
url(r'^DeleteCategory/(?P<name>[\w-]+)', DeleteCategory.as_view()),
#   updates incredients serializer
url(r'^UpdateIncredientProduct/(?P<name>[\w-]+)', UpdateIncredientProduct.as_view()),
#   create product
url(r'^createProduct', CreateProduct.as_view()),
#   Retrive product
url(r'^retrivewProduct/(?P<name>[\w-]+)', RetrivewProduct.as_view()),
#   update catergory
url(r'^UpdateCategory/(?P<name>[\w-]+)', UpdateCategory.as_view()),
#   retrive category
url(r'^RetriveCategory/(?P<name>[\w-]+)', RetriveCategory.as_view()),
#   liis all product
url(r'^ListProduct', ListProduct.as_view()),
#   list category
url(r'^ListCategory', ListCategory.as_view()),
#   createCategory
url(r'^Category', Category.as_view()),
#   update specific incredient in whareHouse
url(r'^UpdateSpecificIncredientInWhareHouse/(?P<name>[\w-]+)', UpdateSpecificIncredientInWhareHouse.as_view()),
#   list specific in a wharehouse
url(r'^RetriveSpecificWharehouseName/(?P<name>[\w-]+)', RetriveSpecificWharehouseName.as_view()),
#   listwhareHouse Data
url(r'^ListWhareHouseData', ListWhareHouseData.as_view()),
#   retrive name in WHarehouse
   url(r'^RetriveWharehouseIncredientName/(?P<name>[\w-]+)', RetriveWharehouseName.as_view()),
# delete a specific incredient in wharehouse
  url(r'^DeleteSpecificIncredientInstore/(?P<name>[\w-]+)', DeleteSpecificIncredientInstore.as_view()),
  # delete a specific incredient in store
url(r'^DeleteSpecificIncredientWharehouse/(?P<name>[\w-]+)', DeleteSpecificIncredientWharehouse.as_view()),
  # UpdateSpecificIncredientInstore
  url(r'^UpdateSpecificIncredientInstore/(?P<name>[\w-]+)', UpdateSpecificIncredientInstore.as_view()),
  #   create an incredient
  url(r'^createIncredient', IncredientInStrore.as_view()),
  # list specific icredient in store
  url(r'^ListSpecificIncredientInstore/(?P<name>[\w-]+)', ListSpecificIncredientInstore.as_view()),
  # listIncredientInstore
  url(r'^ListIncredientInstore', ListIncredientInstore.as_view()),
  # createWhareHouse
  url(r'^createWharehouse', CreateWharehouse.as_view()),
]

