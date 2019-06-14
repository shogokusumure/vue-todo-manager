<template>
  <div class="hello">
    <div class="description">
      <p>このアプリケーションはタスクを管理するためのものです。</p>
      <p>タスクを登録し、それをメモとして残しておくことができます。</p>
      <p>期限を設定すれば、その時間に通知を送ります。通知の許可をお願いします。</p>
    </div>
    <div id="modules">
      <router-link to='/Regist'><div class="module">Taskを<br>Registする</div></router-link>
      <router-link to='/List'><div class="module">Taskを<br>Viewする</div></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Start',
  created: function () {
    // 通知許可を得る
    if ('Notification' in window) {
      var permission = Notification.permission
      if (permission === 'denied' || permission === 'granted') {
        return
      }
      Notification.requestPermission()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html {
  font-size: 62.5%;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  /* color: #42b983; */
  text-decoration: none;
  font-weight: bold;
  font-size: 1.6rem;
}
a:hover {
  /* color: #42b983; */
  opacity: 0.8;
}
#modules {
  width: 80%;
  min-width: 320px;
  max-width: 360px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
#modules .module {
  width: 150px;
  height: 150px;
  border-radius: 5px;
  background: #FFA326;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.description {
  width: 280px;
  margin: 0 auto;
  text-align: left;
}
</style>
