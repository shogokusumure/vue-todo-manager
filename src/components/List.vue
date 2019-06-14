<template>
    <div class="list">
    <h1>タスク一覧</h1>
    <div class="notification" v-if="notification">
      <p>登録しているタスクがありません。</p>
      <router-link to='/Regist'><div class="module">タスクを登録する</div></router-link>
    </div>
    <table>
      <tr v-for="item in list"  v-bind:key="item.id">
        <td class="task">{{ item.task }}</td>
        <td class="limit">{{ item.limit }}</td>
        <td class="done"><button v-on:click="doneTask(item.id)">Done</button></td>
      </tr>
    </table>
    <p><router-link to="/">トップに戻る</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      list: [],
      notification: false
    }
  },
  created: function () {
    var tasklist = localStorage.getItem('tasklist')
    tasklist = JSON.parse(tasklist)

    if (tasklist === null) {
      this.notification = true
    } else {
      if (tasklist.length === 0) {
        this.notification = true
      } else {
        this.list = tasklist
      }
    }
  },
  mounted: function () {
    this.fire()
  },
  methods: {
    doneTask: function (id) {
      var tasklist = localStorage.getItem('tasklist')
      tasklist = JSON.parse(tasklist)

      var newTasklist = []
      tasklist.forEach(function (item) {
        if (item.id !== id) {
          newTasklist.push(item)
        }
      })

      // ローカルストレージ更新
      if (newTasklist.length > 0) {
        this.notification = false
      } else {
        this.notification = true
      }
      var setjsonlist = JSON.stringify(newTasklist)
      localStorage.setItem('tasklist', setjsonlist)

      this.list = newTasklist
    },
    fire: function () {
      setInterval(function () {
        var dateObj = new Date()
        var year = dateObj.getFullYear()
        var month = dateObj.getMonth() + 1
        var today = dateObj.getDate()
        var hour = dateObj.getHours() + ''
        if (hour.length === 1) {
          hour = '0' + hour
        }
        var min = dateObj.getMinutes() + ''
        if (min.length === 1) {
          min = '0' + min
        }
        var time = hour + ':' + min
        var now = year + '-' + month + '-' + today + ' ' + time

        var tasklist = localStorage.getItem('tasklist')
        tasklist = JSON.parse(tasklist)
        var n
        tasklist.forEach(element => {
          if (element.limit === now) {
            n = new Notification(
              'Todo Task Manager',
              {
                body: '「' + element.task + '」の完了時間です。進捗どうですか？'
              }
            )
          }
        })
        n.onclick = function () {
          window.open('https://jolly-chandrasekhar-883344.netlify.com/')
        }
      }, 60000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.list {
  margin-bottom: 50px;
}
table {
  width: 80%;
  max-width: 1020px;
  min-width: 320px;
  margin: 0 auto;
}
td {
  padding: 10px 0;
  border-bottom: 1px dotted #999;
}
.limit,
.done {
  min-width: 85px;
  width: 15%;
}

.notification {
  display: inline-block;
  text-align: center;
  background: #90EE90;
  width: 300px;
  padding: 15px;
  border-radius: 5px;
}
.notification a {
  color: rgb(156, 0, 0);
}

button {
  background: #90EE90;
  padding: 5px 20px;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.3s ease-in-out;
}
button:hover {
  background: rgb(255, 2, 2);
  color: #fff;
}
</style>
