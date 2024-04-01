<template>
  <div class="mainListContainer">
    <h2>{{ logFile.name }}</h2>
    <v-select
      v-model="selectedLevels"
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
      <v-container v-for="(log, index) of filterLogsOnSelectedLevels.logs" :key="index">
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
      </v-container>
    </div>
    <div v-else>
      <v-container>
        <v-card>
          <v-card-title>Geen berichten</v-card-title>
        </v-card>
      </v-container>
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
      selectedLevels: [''] as string[]
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

.v-input {
    height: 100px !important;
}

.v-select {
  height: 100px !important;
}
</style>