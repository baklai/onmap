<template>
  <div>
    <v-card outlined :loading="loading" class="mx-auto">
      <v-list-item three-line>
        <v-list-item-avatar tile size="64">
          <v-icon x-large> mdi-lan-pending </v-icon>
        </v-list-item-avatar>
        <v-list-item-content class="mr-5">
          <v-list-item-title class="headline mb-1 mt-3">
            PING SERVICE
          </v-list-item-title>
          <v-list-item-subtitle>
            Ping — утилита для проверки целостности и качества соединений в
            сетях на основе TCP/IP. Утилита отправляет запросы (ICMP
            Echo-Request) протокола ICMP указанному узлу сети и фиксирует
            поступающие ответы (ICMP Echo-Reply). Время между отправкой запроса
            и получением ответа (RTT, от англ. Round Trip Time) позволяет
            определять двусторонние задержки по маршруту и частоту потери
            пакетов, то есть косвенно определять загруженность на каналах
            передачи данных и промежуточных устройствах.
          </v-list-item-subtitle>

          <v-row align="center">
            <v-col cols="12" xl="10">
              <v-form ref="formPing" lazy-validation @submit.prevent="onPing">
                <v-text-field
                  required
                  clearable
                  persistent-hint
                  type="text"
                  name="target"
                  label="Ping target"
                  prepend-icon="mdi-ip-network-outline"
                  hint="Examples: example.com (host), 192.168.2.10 (single)"
                  class="mt-5 mb-5 mr-5"
                  v-model.trim="target"
                  :rules="targetRules"
                  @click:clear="onClean"
                />
              </v-form>
            </v-col>

            <v-col cols="12" xl="2">
              <v-btn
                outlined
                block
                elevation="2"
                :loading="loading"
                @click="onPing"
              >
                Ping
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>

      <v-card-text class="text-center">
        <pre v-if="report"> {{ report }} </pre>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      target: null,
      report: null,
      targetRules: [
        (v) => !!v || 'IP-address is required',
        (v) =>
          this.hostname.test(v) ||
          this.IPv4.test(v) ||
          'Examples: example.com (host), 192.168.2.10 (single)'
      ]
    };
  },
  computed: {
    hostname() {
      return this.$store.state.regex.hostname;
    },
    IPv4() {
      return this.$store.state.regex.IPv4;
    }
  },
  methods: {
    onClean() {
      this.report = null;
      this.reset();
      this.resetValidation();
    },

    validate() {
      this.$refs.formPing.validate();
    },
    reset() {
      this.$refs.formPing.reset();
    },
    resetValidation() {
      this.$refs.formPing.resetValidation();
    },

    async onPing() {
      if (this.$refs.formPing.validate()) {
        try {
          this.report = null;
          this.loading = true;
          this.$toast.success(`Scan target ${this.target} run!`);
          const { data } = await this.$axios.post('ping', {
            target: this.target
          });
          this.report = data.output;
          this.loading = false;
        } catch (err) {
          this.loading = false;
          this.$toast.error(`Ping target ${this.target} error!`);
        }
      }
    }
  }
};
</script>
