<template>
  <div class="regist">
    <h1>Task 登録</h1>
    <div class="description">
      <p>Task Nameは必須です。</p>
      <p>その他項目は必須ではないですが、<br>未入力の場合タスクの締め切りは１週間後の18:30として登録されます。</p>
    </div>
    <div class="notification" v-if="notification">
      {{ regitered }}を登録しました。
      <router-link to='/List'><div class="module">登録したタスクを確認する</div></router-link>
    </div>
    <div>
      <p>Task Name: {{ name }}</p>
      <input id="task" type="text" v-model="name">
      <p>Limit date: {{ limit }}</p>
      <input id="limit" type="date" v-model="limit">
      <p>Limit time: {{ time }}</p>
      <input id="time" type="time" v-model="time">
    </div>
    <button v-on:click="submit">登録</button>
  </div>
</template>

<script>
export default {
  name: 'Regist',
  data () {
    return {
      name: '',
      limit: '',
      time: '',
      regitered: '',
      notification: false
    }
  },
  methods: {
    submit: function (event) {
      var task = this.name
      var date = this.limit
      var time = this.time

      // task nameは必須
      if (task === '') {
        alert('未入力です')
        return
      }
      // dateが空の場合、１週間後を指定
      if (date === '') {
        var dateObj = new Date()
        var month = dateObj.getMonth() + 1
        var nextdate = dateObj.getDate() + 7
        date = dateObj.getFullYear() + '-' + month + '-' + nextdate
      }
      if (time === '') {
        time = '18:30'
      }

      var tasklist = localStorage.getItem('tasklist')
      tasklist = JSON.parse(tasklist)

      var maxId = 0
      if (tasklist === null) {
        tasklist = []
      }

      tasklist.forEach(function (element) {
        if (element.id > maxId) {
          maxId = element.id
        }
      })

      var content = {
        'id': maxId + 1,
        'task': task,
        'limit': date + ' ' + time
      }
      var setjsonlist = JSON.stringify(content)

      tasklist.push(content)

      setjsonlist = JSON.stringify(tasklist)
      localStorage.setItem('tasklist', setjsonlist)

      this.regitered = task
      this.notification = true

      // 初期化
      this.name = ''
      this.date = ''
      this.time = ''
    }
  }
}
</script>

<style scoped>
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
  color: #42b983;
}
.regist {
  margin-bottom: 50px;
}
.notification {
  display: inline-block;
  text-align: center;
  background: #90EE90;
  color: #696969;
  width: 300px;
  padding: 15px;
  border-radius: 5px;
}
.notification a {
  color: rgb(156, 0, 0);
}
.description {
  width: 80%;
  max-width: 550px;
  margin: 0 auto 20px;
  background: #c7c7c7;
  padding: 10px;
  border-radius: 15px;
}
button {
  background: #90EE90;
  padding: 10px 50px;
  border-radius: 10px;
  font-size: 20px;
  margin-top: 40px;
}
</style>
