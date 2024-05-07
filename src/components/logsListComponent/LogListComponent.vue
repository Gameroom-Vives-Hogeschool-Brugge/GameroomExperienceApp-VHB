<template>
  <div class="mainListContainer">
    <h2>{{ logFile.name }}</h2>
    <v-select
      v-model="selectedLevels"
      class="selectedLevels"
      :items="levels"
      label="Selecteer één of meerdere log levels"
      multiple
    >
      <template v-slot:prepend-item>
        <v-list-item title="Select All" @click="toggle">
          <template v-slot:prepend>
            <v-checkbox-btn
              :color="wantsSomeLevels ? 'indigo-darken-4' : undefined"
              :indeterminate="wantsSomeLevels && !wantsAllLevels"
              :model-value="wantsAllLevels"
            ></v-checkbox-btn>
          </template>
        </v-list-item>
        <v-divider class="mt-2"></v-divider> </template
    ></v-select>
    <div v-if="lengthOfLogs != 0">
      <div v-for="(log, index) of filterLogsOnSelectedLevels.logs" :key="index" class="listContainer">
        <v-card>
          <v-card-title
            :style="[
              log.level == 'warn' ? warnStyle : '',
              log.level == 'error' ? errorStyle : '',
              log.level == 'info' ? infoStyle : '',
              log.level == 'debug' ? debugStyle : '',
              log.level == 'silly' ? sillyStyle : '',
              log.level == 'verbose' ? verboseStyle : ''
            ]"
          >
            Level: {{ log.level.toUpperCase() }}
          </v-card-title>
          <v-card-text>
            <p><strong>Bericht:</strong> {{ log.message ? log.message : 'Geen bericht' }}</p>
            <p><strong>Tijdstip:</strong> {{ log.timestamp }}</p>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div v-else class="noMessagesDiv">
      <v-card class="noMessagesCard">
        <v-card-title>Geen berichten</v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { LogFile } from '@/models/logFile'

export default defineComponent({
  name: 'LogListComponent',
  components: {},
  props: {
    logFile: {
      type: Object as () => LogFile,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    return {}
  },
  data() {
    return {
      errorStyle: {
        color: 'red'
      },
      warnStyle: {
        color: 'orange'
      },
      infoStyle: {
        color: 'blue'
      },
      debugStyle: {
        color: 'green'
      },
      sillyStyle: {
        color: 'purple'
      },
      verboseStyle: {
        color: 'black'
      },
      levels: ['ERROR', 'WARN', 'INFO', 'DEBUG', 'SILLY', 'VERBOSE'],
      selectedLevels: ['INFO'] as string[]
    }
  },
  methods: {
    toggle() {
      if (this.wantsAllLevels) {
        this.selectedLevels = [""]
      } else {
        this.selectedLevels = []
        this.selectedLevels = this.levels.slice()
      }
    }
  },
  computed: {
    sortLogsOnLevel(): LogFile {
      const levels = ['ERROR', 'WARN', 'INFO', 'DEBUG', 'SILLY', 'VERBOSE']
      const logsCopy = [...this.logFile.logs];
      const newLogs = logsCopy.sort((a, b) => levels.indexOf(a.level) - levels.indexOf(b.level));
        return {
            name: this.logFile.name,
            logs: newLogs
        }
    },
    filterLogsOnSelectedLevels(): LogFile {
      return {
        name: this.logFile.name,
        logs: this.sortLogsOnLevel.logs.filter((log) => this.selectedLevels.includes(log.level.toUpperCase()))
      }
    },
    lengthOfLogs(): number {
      try {
        return this.filterLogsOnSelectedLevels.logs.length
      } catch (error) {
        return 0
      }
    },
    wantsSomeLevels(): boolean {
      return this.selectedLevels[0] != ""
    },
    wantsAllLevels(): boolean {
      return this.selectedLevels.length === this.levels.length
    }
  }
})
</script>

<style scoped>
.mainListContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.selectedLevels{
  padding: 0px;
}

.listContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.noMessagesDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
}

.v-card {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 10px;
  width: 80%;
}

.noMessagesCard > .v-card-title {
  text-align: center;
}

.v-card-text {
  word-break: break-all;
}

.v-input {
    height: 100px !important;
}

.v-select {
  height: 100px !important;
  width: 80%;
  max-width: 500px;
}
</style>
