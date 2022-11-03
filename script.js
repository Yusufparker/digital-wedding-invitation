const firebaseConfig = {
    apiKey: "AIzaSyBfZr6_4GcQNzKWl-AA-5OYCQNfLbwPkg4",
    authDomain: "undangan-1-b6cb2.firebaseapp.com",
    databaseUrl :'https://undangan-1-b6cb2-default-rtdb.firebaseio.com/',
    projectId: "undangan-1-b6cb2",
    storageBucket: "undangan-1-b6cb2.appspot.com",
    messagingSenderId: "80755758419",
    appId: "1:80755758419:web:9745795f8c777eb0abbda6",
    measurementId: "G-3DBK20YY9C" 
  };


firebase.initializeApp(firebaseConfig);

const db = firebase.database();

document.getElementById('send-ucapan').addEventListener('click', kirimKomen);


function kirimKomen(e){
    e.preventDefault();
    var username = document.getElementById('inputnama').value;
    var message = document.getElementById('inputucapan').value;
    document.getElementById('inputnama').value='';
    document.getElementById('inputucapan').value = '';
    if (username.length < 1 || message.length < 1){
        alert('Nama dan pesan tidak boleh kosong');
    }else{
        var date = new Date();
        var jam = date.getHours();
        if (jam == '0'){
            jam == '00';
        }
        var menit = date.getMinutes();
        if (menit == '0'){
            menit = '00';
        }
        var pukul = jam+':'+menit;
        var timestamp = Date.now();
        db.ref("messages/"+timestamp).set({
            pengirim : username,
            pesan : message,
            pukul: pukul
        })

    }
    
    

};

const fetchChat = db.ref("messages/");
fetchChat.on("child_added", function (snapshot){
    const messages = snapshot.val();
    var msg = "<li class = 'pengirim'>"+messages.pengirim+"</li><li class = 'komen-chat'>"+messages.pesan+"<br><p>"+messages.pukul+"</p></li>";
    document.getElementById('messages').innerHTML += msg;       
});



var countDownDate = new Date("May 28, 2022 00:00:00").getTime();

// Hitungan Mundur Waktu Dilakukan Setiap Satu Detik
var x = setInterval(function() {
  // Mendapatkan Tanggal dan waktu Pada Hari ini
  var now = new Date().getTime();
  //Jarak Waktu Antara Hitungan Mundur
  var distance = countDownDate - now;
  // Perhitungan waktu hari, jam, menit dan detik
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  // Tampilkan hasilnya di elemen id = "carasingkat"
  document.getElementById("hitung-hari").innerHTML = days;
  document.getElementById("hitung-jam").innerHTML = hours;
  document.getElementById("hitung-menit").innerHTML = minutes;
  document.getElementById("hitung-detik").innerHTML = seconds;
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("hitung-hari").innerHTML = 0;
    document.getElementById("hitung-jam").innerHTML = 0;
    document.getElementById("hitung-menit").innerHTML = 0;
    document.getElementById("hitung-detik").innerHTML = 0;
    
  }
}, 1000);