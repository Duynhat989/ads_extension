import { save_local_storage,open_local_storage,get_list_tabs } from '../../controller/popup.controller.js'
window.onload =async () =>{
  setTimeout(()=>{
    load_save()
  },1000)
  async function load_save(){
    var saves = await open_local_storage("ads_extension")
  }

  var btn_save = document.querySelector('.btn_save')
  btn_save.addEventListener('click',()=>{
    var url = document.querySelector('#url')
    var desciption_1 = document.querySelector('#desciption_1')
    var desciption_2 = document.querySelector('#desciption_2')
    var price_1 = document.querySelector('#price_1')
    var price_2 = document.querySelector('#price_2')
    var count_create = document.querySelector('#count_create')
    var type_Country = document.querySelector('#type_Country')
    var country = document.querySelector('#country')
    var setup = {
      url:url.value,
      MOTA1:desciption_1.value,
      MOTA2:desciption_2.value,
      price_1:price_1.value,
      price_2:price_2.value,
      create:count_create.value,
      country:country.value,
      type_Country:type_Country.value
    }
    console.log(setup)
    save_local_storage("ads_extension",JSON.stringify(setup))
    Swal.fire(
      'Good job!',
      'Lưu thành công',
      'success'
    )
  })
  // 
  var btn_running = document.querySelector('.btn_running')
  btn_running.addEventListener('click',()=>{
    get_list_tabs()
  })
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'get_data') {
      var setup = JSON.parse(message.data)
      var url = document.querySelector('#url')
      var desciption_1 = document.querySelector('#desciption_1')
      var desciption_2 = document.querySelector('#desciption_2')
      var price_1 = document.querySelector('#price_1')
      var price_2 = document.querySelector('#price_2')
      var count_create = document.querySelector('#count_create')
      var country = document.querySelector('#country')
      url.value = setup.url
      desciption_1.value = setup.MOTA1
      desciption_2.value = setup.MOTA2
      price_1.value = setup.price_1
      price_2.value = setup.price_2
      count_create.value = setup.create
      country.value = setup.country
      type_Country.value = setup.type_Country
      // Your logic here...
    }
  });
}
