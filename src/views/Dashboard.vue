<!--
	这是仪表板页面，它在以下位置使用仪表板布局：“./layouts/Dashboard.vue”。
 -->

<template>
  <!--  <div>-->
  <a-layout style="margin-left: 0">
    <a-layout-content>

      <a-row :gutter="24" type="flex" justify="space-around" align="middle">
        <a-col v-for="(stat, index) in stats" :key="index" :lg="12" :span="24" :xl="6" class="mb-24">
          <!-- Widget 1 Card -->
          <WidgetCounter
              :icon="stat.icon"
              :prefix="stat.prefix"
              :status="stat.status"
              :suffix="stat.suffix"
              :title="stat.title"
              :value="stat.value"
          ></WidgetCounter>
          <!-- / Widget 1 Card -->
        </a-col>
        <a-col :lg="12" :span="24" :xl="6" class="mb-24">
          <a-popconfirm placement="bottom"
                        ok-text="Yes"
                        cancel-text="No"
                        :ok-button-props="{ style: { display: 'none' } }"
                        :cancel-button-props="{ style: { display: 'none' } }">
            <template slot="title">
              <a-tree
                  v-model="check_tree_data"
                  :checkable="true"
                  :tree-data="printerTreeData"
              />
            </template>
            <a-icon slot="icon" type="question-circle-o" style="display: none"/>
            <a-card :bordered="false" class="widget-1 hover-class">
              <div class="widget-select">
                <div class="item1">
              <span class="select-title">
                选择打印机
              </span>
                  <div v-show="check_printer_name.length > 0">
                    {{ check_printer_name[0] }}
                  </div>
                  <div v-show="check_printer_name.length > 1">
                    {{ check_printer_name[1] }}
                  </div>
                  <div v-show="check_printer_name.length < 1">
                    ...
                  </div>
                  <div v-show="check_printer_name.length < 2">
                    ...
                  </div>
                </div>
                <div>
                  <svg t="1711698193046" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg"
                       p-id="8593" width="200" height="200">
                    <path
                        d="M736 112H96a80 80 0 0 0-80 80v640a80 80 0 0 0 80 80h640a80 80 0 0 0 80-80V192a80 80 0 0 0-80-80z"
                        fill="#0097A7" p-id="8594"></path>
                    <path
                        d="M736 104H96A88.096 88.096 0 0 0 8 192v640c0 48.528 39.472 88 88 88h640c48.528 0 88-39.472 88-88V192c0-48.528-39.472-88-88-88zM808 832c0 39.696-32.304 72-72 72H96A72.08 72.08 0 0 1 24 832V192c0-39.696 32.304-72 72-72h640c39.696 0 72 32.304 72 72v640z"
                        fill="#37474F" p-id="8595"></path>
                    <path
                        d="M928 112H288a80 80 0 0 0-80 80v640a80 80 0 0 0 80 80h640a80 80 0 0 0 80-80V192a80 80 0 0 0-80-80z"
                        fill="#26C6DA" p-id="8596"></path>
                    <path
                        d="M928 104H288a88.096 88.096 0 0 0-88 88v640c0 48.528 39.472 88 88 88h640c48.528 0 88-39.472 88-88V192c0-48.528-39.472-88-88-88zM1000 832c0 39.696-32.304 72-72 72H288a72.08 72.08 0 0 1-72-72V192c0-39.696 32.304-72 72-72h640c39.696 0 72 32.304 72 72v640z"
                        fill="#37474F" p-id="8597"></path>
                    <path
                        d="M288 872a40.048 40.048 0 0 1-40-40V192c0-22.048 17.952-40 40-40a8 8 0 0 0 0-16c-30.88 0-56 25.12-56 56v640c0 30.88 25.12 56 56 56a8 8 0 0 0 0-16z"
                        fill="#80DEEA" p-id="8598"></path>
                    <path
                        d="M96 872A40.048 40.048 0 0 1 56 832V192c0-22.048 17.952-40 40-40a8 8 0 0 0 0-16c-30.88 0-56 25.12-56 56v640c0 30.88 25.12 56 56 56a8 8 0 0 0 0-16z"
                        fill="#26C6DA" p-id="8599"></path>
                    <path
                        d="M928 136a8 8 0 0 0 0 16c22.048 0 40 17.952 40 40v640c0 22.048-17.952 40-40 40a8 8 0 0 0 0 16c30.88 0 56-25.12 56-56V192c0-30.88-25.12-56-56-56z"
                        fill="#0097A7" p-id="8600"></path>
                    <path d="M872 208h-528a40 40 0 0 0-40 40v448a40 40 0 0 0 40 40H608l80-96h224V248a40 40 0 0 0-40-40z"
                          fill="#EEEEEE" p-id="8601"></path>
                    <path
                        d="M872 200h-528c-26.464 0-48 21.536-48 48v448c0 26.464 21.536 48 48 48H608a8 8 0 0 0 6.144-2.88l77.6-93.12H912a8 8 0 0 0 8-8V248c0-26.464-21.536-48-48-48z m32 432H688a8 8 0 0 0-6.144 2.88l-77.6 93.12H344c-17.648 0-32-14.352-32-32v-448c0-17.648 14.352-32 32-32h528c17.648 0 32 14.352 32 32v384z"
                        fill="#37474F" p-id="8602"></path>
                    <path d="M720 688h112v48h-112z" fill="#EEEEEE" p-id="8603"></path>
                    <path
                        d="M832 680h-112a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8z m-8 48h-96v-32h96v32z"
                        fill="#37474F" p-id="8604"></path>
                    <path d="M888 712m-24 0a24 24 0 1 0 48 0 24 24 0 1 0-48 0Z" fill="#EEEEEE" p-id="8605"></path>
                    <path
                        d="M888 680c-17.648 0-32 14.352-32 32s14.352 32 32 32 32-14.352 32-32-14.352-32-32-32z m0 48c-8.816 0-16-7.184-16-16s7.184-16 16-16 16 7.184 16 16-7.184 16-16 16z"
                        fill="#37474F" p-id="8606"></path>
                    <path d="M336 784h56v48H336z" fill="#EEEEEE" p-id="8607"></path>
                    <path
                        d="M392 776H336a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h56a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8z m-8 48h-40v-32H384v32z"
                        fill="#37474F" p-id="8608"></path>
                    <path d="M432 784h56v48H432z" fill="#EEEEEE" p-id="8609"></path>
                    <path
                        d="M488 776H432a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h56a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8z m-8 48h-40v-32H480v32z"
                        fill="#37474F" p-id="8610"></path>
                    <path d="M528 784h56v48H528z" fill="#EEEEEE" p-id="8611"></path>
                    <path
                        d="M584 776H528a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h56a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8z m-8 48h-40v-32H576v32zM800 584H416a8 8 0 0 0 0 16h384a8 8 0 0 0 0-16z"
                        fill="#37474F" p-id="8612"></path>
                    <path d="M304 272h608v32H304z" fill="#78909C" p-id="8613"></path>
                    <path
                        d="M912 264H304a8 8 0 0 0-8 8v32a8 8 0 0 0 8 8h608a8 8 0 0 0 8-8v-32a8 8 0 0 0-8-8z m-8 32h-592v-16h592v16z"
                        fill="#37474F" p-id="8614"></path>
                    <path
                        d="M656 256h-96a16 16 0 0 0-16 16v72a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16V272a16 16 0 0 0-16-16z"
                        fill="#78909C" p-id="8615"></path>
                    <path
                        d="M656 248h-96c-13.232 0-24 10.768-24 24v72c0 13.232 10.768 24 24 24h96c13.232 0 24-10.768 24-24V272c0-13.232-10.768-24-24-24z m8 96a8 8 0 0 1-8 8h-96a8 8 0 0 1-8-8V272a8 8 0 0 1 8-8h96a8 8 0 0 1 8 8v72z"
                        fill="#37474F" p-id="8616"></path>
                    <path d="M584 360v32L608 416l24-24v-32z" fill="#78909C" p-id="8617"></path>
                    <path
                        d="M632 352h-48a8 8 0 0 0-8 8v32c0 2.128 0.848 4.16 2.336 5.664l24 24a8.032 8.032 0 0 0 11.328 0l24-24A8.064 8.064 0 0 0 640 392v-32a8 8 0 0 0-8-8z m-8 36.688l-16 16-16-16V368h32v20.688z"
                        fill="#37474F" p-id="8618"></path>
                    <path d="M584 432v80h-80v80h160V432z" fill="#E64A19" p-id="8619"></path>
                    <path
                        d="M664 424h-80a8 8 0 0 0-8 8v72h-72a8 8 0 0 0-8 8v80a8 8 0 0 0 8 8h160a8 8 0 0 0 8-8V432a8 8 0 0 0-8-8z m-8 160h-144v-64h72a8 8 0 0 0 8-8v-72h64v144z"
                        fill="#37474F" p-id="8620"></path>
                    <path d="M632 432v80h-80v80h160V432z" fill="#FF7043" p-id="8621"></path>
                    <path
                        d="M712 424h-80a8 8 0 0 0-8 8v72h-72a8 8 0 0 0-8 8v80a8 8 0 0 0 8 8h160a8 8 0 0 0 8-8V432a8 8 0 0 0-8-8z m-8 160h-144v-64h72a8 8 0 0 0 8-8v-72h64v144z"
                        fill="#37474F" p-id="8622"></path>
                  </svg>
                </div>
              </div>
            </a-card>
          </a-popconfirm>
        </a-col>
      </a-row>
      <a-row :gutter="24"
             align="top"
             type="flex"
             v-for="(item,index) in printer_data"
             :key="index"
             v-if="index % 2 === 0"
      >
        <a-col :lg="12" :span="24" class="mb-24">
          <CardBarChart
              :printer_name="item.name"
              :printer_status="item.status"
              :printer_sn="item.id"
              :printer_describe="item.describe"
              :check="item.check ? item.check : false"
              :check_button_props_enable="item.check_button_props_enable ? item.check_button_props_enable : false"
              :print_status="item.print_status ? item.print_status:{}"
              @check-printer="checkPrinter"
              @print-control="printControl"
          >
          </CardBarChart>
        </a-col>
        <a-col :lg="12" :span="24" class="mb-24" v-if="index !== printer_data.length - 1">
          <CardBarChart
              :printer_name="printer_data[index+1].name"
              :printer_status="printer_data[index+1].status"
              :printer_sn="printer_data[index+1].id"
              :printer_describe="printer_data[index+1].describe"
              :check="printer_data[index+1].check ? printer_data[index+1].check : false"
              :check_button_props_enable="printer_data[index+1].check_button_props_enable ? printer_data[index+1].check_button_props_enable : false"
              :print_status="printer_data[index+1].print_status ? printer_data[index+1].print_status:{}"
              @print-control="printControl"
              @check-printer="checkPrinter"
          >
          </CardBarChart>
        </a-col>
        <a-col :lg="12" :span="24" class="mb-24" v-if="index === printer_data.length - 1&&printer_data.length%2===1">
          <AddPrinter @update-printer-data="updateNewPrinterData"></AddPrinter>
        </a-col>
      </a-row>
      <a-row :gutter="24" align="stretch" type="flex" v-if="printer_data.length%2===0">
        <a-col :lg="12" :span="24" class="mb-24">
          <AddPrinter @update-printer-data="updateNewPrinterData"></AddPrinter>
        </a-col>
      </a-row>
      <Notification
          ref="addPrinterNotification"
          placement="topRight"
          :duration="null"
          :top="30"
          @close="onClose"/>
    </a-layout-content>
    <a-layout-sider
        theme="light"
        :width="sider_width"
    >
      <a-divider class="select-title">XY轴移动</a-divider>
      <a-row :gutter="24" align="stretch" type="flex" justify="center" class="all-row">
        <!--        <a-col :span="4"></a-col>-->
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-tooltip placement="top"
                     overlayClassName="popover"
                     :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <template slot="title">
              <span>Y轴移动 10.0</span>
            </template>
            <a-button
                type="link"
                class="all-button"
                :disabled="batchOperationButtonEnabled"
                @click="motionControl('move','y',10)">
              <i class='bx bxs-chevrons-up icon-large'></i>
            </a-button>
          </a-tooltip>
        </a-col>
        <!--        <a-col :span="4"></a-col>-->
      </a-row>
      <a-row :gutter="24" align="stretch" type="flex" justify="center" class="all-row">
        <!--        <a-col :span="4"></a-col>-->
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-tooltip placement="top"
                     overlayClassName="popover"
                     :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <template slot="title">
              <span>Y轴移动 1.0</span>
            </template>
            <a-button
                type="link"
                class="all-button"
                :disabled="batchOperationButtonEnabled"
                @click="motionControl('move','y',1)">
              <i class='bx bx-chevrons-up icon-medium'></i>
            </a-button>
          </a-tooltip>
        </a-col>
        <!--        <a-col :span="4"></a-col>-->
      </a-row>
      <a-row :gutter="24" align="stretch" type="flex" justify="center" class="all-row">
        <!--        <a-col :span="4"></a-col>-->
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-tooltip placement="top"
                     overlayClassName="popover"
                     :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <template slot="title">
              <span>Y轴移动 0.1</span>
            </template>
            <a-button
                type="link"
                class="all-button"
                :disabled="batchOperationButtonEnabled"
                @click="motionControl('move','y',0.1)">
              <i class='bx bx-chevron-up icon-small'></i>
            </a-button>
          </a-tooltip>

        </a-col>
        <!--        <a-col :span="4"></a-col>-->
      </a-row>
      <a-row :gutter="32" align="stretch" type="flex" justify="center">
        <a-col :span="3" class="col-left-right">
          <a-tooltip placement="top"
                     overlayClassName="popover"
                     :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <template slot="title">
              <span>X轴移动 -10.0</span>
            </template>
            <a-button
                type="link"
                class="button-left-right all-button"
                :disabled="batchOperationButtonEnabled"
                style="display:flex" @click="motionControl('move','x',-10)">
              <i class='bx bxs-chevrons-left icon-large'></i>
            </a-button>
          </a-tooltip>
        </a-col>
        <a-col :span="3" class="col-left-right">
          <a-tooltip placement="top"
                     overlayClassName="popover"
                     :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <template slot="title">
              <span>X轴移动 -1.0</span>
            </template>
            <a-button
                type="link"
                class="button-left-right all-button"
                :disabled="batchOperationButtonEnabled"
                style="display:flex"
                @click="motionControl('move','x',-1)">
              <i class='bx bx-chevrons-left icon-medium'></i>
            </a-button>
          </a-tooltip>
        </a-col>
        <a-col :span="3" class="col-left-right">
          <a-tooltip placement="top"
                     overlayClassName="popover"
                     :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <template slot="title">
              <span>X轴移动 -0.1</span>
            </template>
            <a-button
                type="link"
                class="button-left-right all-button"
                :disabled="batchOperationButtonEnabled"
                style="display:flex"
                @click="motionControl('move','x',-0.1)">
              <i class='bx bx-chevron-left icon-small'></i>
            </a-button>
          </a-tooltip>
        </a-col>
        <!--        <a-col :span="4"></a-col>-->
        <a-col :span="3" class="col-left-right">
          <a-tooltip placement="top"
                     overlayClassName="popover"
                     :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <template slot="title">
              <span>XYZ轴回零</span>
            </template>
            <a-button
                type="link"
                class="button-left-right all-button"
                :disabled="batchOperationButtonEnabled"
                style="display:flex"
                @click="motionControl('home','xyz')">
              <i class='bx bx-home-circle icon-medium'></i>
            </a-button>
          </a-tooltip>
        </a-col>
        <a-col :span="3" class="col-left-right">
          <a-tooltip placement="top"
                     overlayClassName="popover"
                     :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <template slot="title">
              <span>X轴移动 0.1</span>
            </template>
            <a-button
                type="link"
                class="button-left-right all-button"
                :disabled="batchOperationButtonEnabled"
                style="display:flex"
                @click="motionControl('move','x',0.1)">
              <i class='bx bx-chevron-right icon-small'></i>
            </a-button>
          </a-tooltip>
        </a-col>
        <a-col :span="3" class="col-left-right">
          <a-tooltip placement="top"
                     overlayClassName="popover"
                     :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <template slot="title">
              <span>X轴移动 1.0</span>
            </template>
            <a-button
                type="link"
                class="button-left-right all-button"
                :disabled="batchOperationButtonEnabled"
                style="display:flex"
                @click="motionControl('move','x',1)">
              <i class='bx bx-chevrons-right icon-medium'></i>
            </a-button>
          </a-tooltip>
        </a-col>
        <a-col :span="3" class="col-left-right">
          <a-tooltip placement="top"
                     overlayClassName="popover"
                     :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <template slot="title">
              <span>X轴移动 10.0</span>
            </template>
            <a-button
                type="link"
                class="button-left-right all-button"
                :disabled="batchOperationButtonEnabled"
                style="display:flex"
                @click="motionControl('move','x',10)">
              <i class='bx bxs-chevrons-right icon-large'></i>
            </a-button>
          </a-tooltip>
        </a-col>
        <a-col :span="0">
        </a-col>
        <!--        <a-col :span="4"></a-col>-->
      </a-row>
      <a-row :gutter="24" align="stretch" type="flex" justify="center" class="all-row">
        <!--        <a-col :span="4"></a-col>-->
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-tooltip placement="top"
                     overlayClassName="popover"
                     :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <template slot="title">
              <span>Y轴移动 -0.1</span>
            </template>
            <a-button
                type="link"
                class="all-button"
                :disabled="batchOperationButtonEnabled"
                @click="motionControl('move','y',-0.1)">
              <i class='bx bx-chevron-down icon-small'></i>
            </a-button>
          </a-tooltip>
        </a-col>
      </a-row>

      <a-row :gutter="24" align="stretch" type="flex" justify="center" class="all-row">
        <!--        <a-col :span="4"></a-col>-->
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-tooltip placement="top"
                     overlayClassName="popover"
                     :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <template slot="title">
              <span>Y轴移动 -1.0</span>
            </template>
            <a-button
                type="link"
                class="all-button"
                :disabled="batchOperationButtonEnabled"
                @click="motionControl('move','y',-1)">
              <i class='bx bx-chevrons-down icon-medium'></i>
            </a-button>
          </a-tooltip>

        </a-col>
        <!--        <a-col :span="4"></a-col>-->
      </a-row>
      <a-row :gutter="24" align="stretch" type="flex" justify="center" class="all-row" style="padding-bottom: 10px">
        <!--        <a-col :span="4"></a-col>-->
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-tooltip placement="top"
                     overlayClassName="popover"
                     :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <template slot="title">
              <span>Y轴移动 -10.0</span>
            </template>
            <a-button
                type="link"
                class="all-button"
                :disabled="batchOperationButtonEnabled"
                @click="motionControl('move','y',-10)">
              <i class='bx bxs-chevrons-down icon-large'></i>
            </a-button>
          </a-tooltip>
        </a-col>
        <!--        <a-col :span="4"></a-col>-->
      </a-row>
      <a-divider class="select-title">ZE轴移动</a-divider>
      <a-row :gutter="24" align="stretch" type="flex" justify="center" class="all-row" style="padding-top: 10px">
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-button ze-arrow-button"
              :disabled="batchOperationButtonEnabled"
          >
            <i class='bx bxs-up-arrow icon-large'></i>
          </a-button>
        </a-col>
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-button ze-arrow-button"
              :disabled="batchOperationButtonEnabled"
          >
            <i class='bx bxs-up-arrow icon-large'></i>
          </a-button>
        </a-col>
      </a-row>
      <a-row :gutter="24" align="stretch" type="flex" justify="center" class="all-row">
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-num-button ze-button"
              :disabled="batchOperationButtonEnabled"
              style="display:flex;border: transparent"
              @click="motionControl('move','z',100)">
            100
          </a-button>
        </a-col>
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-num-button ze-button"
              :disabled="batchOperationButtonEnabled"
              @click="motionControl('auto_load_filament',0,'unload')">
            一键退料
          </a-button>
        </a-col>
      </a-row>
      <a-row :gutter="24" align="stretch" type="flex" justify="center" class="all-row">
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-num-button ze-button"
              :disabled="batchOperationButtonEnabled"
              @click="motionControl('move','z',10)">
            10
          </a-button>
        </a-col>
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-num-button ze-button"
              :disabled="batchOperationButtonEnabled"
              @click="motionControl('move','e',10)">
            10
          </a-button>
        </a-col>
      </a-row>
      <a-row :gutter="24" align="stretch" type="flex" justify="center" class="all-row">
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-num-button ze-button"
              :disabled="batchOperationButtonEnabled"
              @click="motionControl('move','z',1)">
            1
          </a-button>
        </a-col>
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-num-button ze-button"
              :disabled="batchOperationButtonEnabled"
              @click="motionControl('move','e',1)">
            1
          </a-button>
        </a-col>
      </a-row>
      <a-row :gutter="24" align="stretch" type="flex" justify="center" class="all-row">
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-num-button ze-button"
              style="width: 45%"
              :disabled="batchOperationButtonEnabled">
            Z axis
          </a-button>
        </a-col>
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-num-button ze-button"
              style="width: 45%"
              :disabled="batchOperationButtonEnabled">
            E axis
          </a-button>
        </a-col>
      </a-row>
      <a-row :gutter="24" align="stretch" type="flex" justify="center" class="all-row">
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-num-button ze-button"
              :disabled="batchOperationButtonEnabled"
              @click="motionControl('move','z',-1)">
            1
          </a-button>
        </a-col>
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-num-button ze-button"
              :disabled="batchOperationButtonEnabled"
              @click="motionControl('move','e',-1)">
            1
          </a-button>
        </a-col>
      </a-row>
      <a-row :gutter="24" align="stretch" type="flex" justify="center" class="all-row">
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-num-button ze-button"
              :disabled="batchOperationButtonEnabled"
              @click="motionControl('move','z',-10)">
            10
          </a-button>
        </a-col>
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-num-button ze-button"
              :disabled="batchOperationButtonEnabled"
              @click="motionControl('move','e',-10)">
            10
          </a-button>
        </a-col>
      </a-row>
      <a-row :gutter="24" align="stretch" type="flex" justify="center" class="all-row">
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-num-button ze-button"
              :disabled="batchOperationButtonEnabled"
              @click="motionControl('move','z',-100)">
            100
          </a-button>
        </a-col>
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-num-button ze-button"
              :disabled="batchOperationButtonEnabled"
              @click="motionControl('auto_load_filament',0,'load')">
            一键进料
          </a-button>
        </a-col>
      </a-row>
      <a-row :gutter="24" align="stretch" type="flex" justify="center" class="all-row">
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-button ze-arrow-button"
              :disabled="batchOperationButtonEnabled">
            <i class='bx bxs-down-arrow icon-large'></i>
          </a-button>
        </a-col>
        <a-col :span="16" :xs="16" :sm="4" :md="6" :lg="8" :xl="10" class="col-up-down">
          <a-button
              type="link"
              size="small"
              class="all-button ze-arrow-button"
              :disabled="batchOperationButtonEnabled">
            <i class='bx bxs-down-arrow icon-large'></i>
          </a-button>
        </a-col>
      </a-row>
      <a-divider class="select-title">打印控制</a-divider>
      <a-row :gutter="36" align="stretch" type="flex" justify="center" class="all-row">
        <a-col :span="8">
          <a-button
              type="primary"
              icon="fast-forward"
              style="font-size: 16px"
              :disabled="batchOperationButtonEnabled"
              @click="printControl('start')"
          >
            开始打印
          </a-button>
        </a-col>
        <a-col :span="8">
          <a-button
              type="primary"
              icon="pause"
              style="font-size: 16px"
              :disabled="batchOperationButtonEnabled"
              @click="printControl('suspend')"
          >
            暂停打印
          </a-button>
        </a-col>
      </a-row>
      <a-row :gutter="36" align="stretch" type="flex" justify="center" class="all-row">
        <a-col :span="8">
          <div>
            <a-button
                type="primary"
                icon="cloud-upload"
                style="font-size: 16px" @click="openFileDialog"
                :disabled="batchOperationButtonEnabled"
                :loading="uploadButtonLoading">
              上传文件
            </a-button>
            <input type="file" ref="fileInput" style="display: none" @change="onFileSelected"/>
          </div>
        </a-col>
        <a-col :span="8">
          <a-button
              type="danger"
              icon="stop"
              style="font-size: 16px"
              :disabled="batchOperationButtonEnabled"
              @click="printControl('cease')"
          >
            停止打印
          </a-button>
        </a-col>
      </a-row>
      <a-divider class="select-title">当前打印文件</a-divider>
      <a-list item-layout="horizontal" :data-source="selectedPrintFiles">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta
              :description="'打印机：' + item.printer_id"
          >
            <a slot="title">{{ item.filename }}</a>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-layout-sider>
  </a-layout>
  <!--  </div>-->
  <!--  <a-layout-sider>Sider</a-layout-sider>-->
</template>
<script>

import CardBarChart from '../components/Cards/CardBarChart';
import WidgetCounter from '../components/Widgets/WidgetCounter';
import AddPrinter from "@/components/Cards/AddPrinter.vue";
import Notification from "@/components/Notification.vue";

// Counter Widgets stats
const stats = [
  {
    title: "空闲打印机",
    value: 53,
    prefix: "+",
    suffix: "+30%",
    icon: `<svg t="1711696185632" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3541" id="mx_n_1711696185634" width="200" height="200"><path d="M736 112H96a80 80 0 0 0-80 80v640a80 80 0 0 0 80 80h640a80 80 0 0 0 80-80V192a80 80 0 0 0-80-80z" fill="#e6e6e6" p-id="3542" data-spm-anchor-id="a313x.search_index.0.i8.4d493a81k7wgFv" class="selected"></path><path d="M736 104H96A88.096 88.096 0 0 0 8 192v640c0 48.528 39.472 88 88 88h640c48.528 0 88-39.472 88-88V192c0-48.528-39.472-88-88-88zM808 832c0 39.696-32.304 72-72 72H96A72.08 72.08 0 0 1 24 832V192c0-39.696 32.304-72 72-72h640c39.696 0 72 32.304 72 72v640z" fill="#37474F" p-id="3543"></path><path d="M928 112H288a80 80 0 0 0-80 80v640a80 80 0 0 0 80 80h640a80 80 0 0 0 80-80V192a80 80 0 0 0-80-80z" fill="#26C6DA" p-id="3544"></path><path d="M928 104H288a88.096 88.096 0 0 0-88 88v640c0 48.528 39.472 88 88 88h640c48.528 0 88-39.472 88-88V192c0-48.528-39.472-88-88-88zM1000 832c0 39.696-32.304 72-72 72H288a72.08 72.08 0 0 1-72-72V192c0-39.696 32.304-72 72-72h640c39.696 0 72 32.304 72 72v640z" fill="#37474F" p-id="3545"></path><path d="M288 872a40.048 40.048 0 0 1-40-40V192c0-22.048 17.952-40 40-40a8 8 0 0 0 0-16c-30.88 0-56 25.12-56 56v640c0 30.88 25.12 56 56 56a8 8 0 0 0 0-16z" fill="#80DEEA" p-id="3546"></path><path d="M96 872A40.048 40.048 0 0 1 56 832V192c0-22.048 17.952-40 40-40a8 8 0 0 0 0-16c-30.88 0-56 25.12-56 56v640c0 30.88 25.12 56 56 56a8 8 0 0 0 0-16z" fill="#26C6DA" p-id="3547"></path><path d="M928 136a8 8 0 0 0 0 16c22.048 0 40 17.952 40 40v640c0 22.048-17.952 40-40 40a8 8 0 0 0 0 16c30.88 0 56-25.12 56-56V192c0-30.88-25.12-56-56-56z" fill="#0097A7" p-id="3548"></path><path d="M872 208h-528a40 40 0 0 0-40 40v448a40 40 0 0 0 40 40H608l80-96h224V248a40 40 0 0 0-40-40z" fill="#e6e6e6" p-id="3549" data-spm-anchor-id="a313x.search_index.0.i10.4d493a81k7wgFv" class="selected"></path><path d="M872 200h-528c-26.464 0-48 21.536-48 48v448c0 26.464 21.536 48 48 48H608a8 8 0 0 0 6.144-2.88l77.6-93.12H912a8 8 0 0 0 8-8V248c0-26.464-21.536-48-48-48z m32 432H688a8 8 0 0 0-6.144 2.88l-77.6 93.12H344c-17.648 0-32-14.352-32-32v-448c0-17.648 14.352-32 32-32h528c17.648 0 32 14.352 32 32v384z" fill="#37474F" p-id="3550"></path><path d="M720 688h112v48h-112z" fill="#EEEEEE" p-id="3551"></path><path d="M832 680h-112a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8z m-8 48h-96v-32h96v32z" fill="#37474F" p-id="3552"></path><path d="M888 712m-24 0a24 24 0 1 0 48 0 24 24 0 1 0-48 0Z" fill="#EEEEEE" p-id="3553"></path><path d="M888 680c-17.648 0-32 14.352-32 32s14.352 32 32 32 32-14.352 32-32-14.352-32-32-32z m0 48c-8.816 0-16-7.184-16-16s7.184-16 16-16 16 7.184 16 16-7.184 16-16 16z" fill="#37474F" p-id="3554"></path><path d="M336 784h56v48H336z" fill="#EEEEEE" p-id="3555"></path><path d="M392 776H336a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h56a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8z m-8 48h-40v-32H384v32z" fill="#37474F" p-id="3556"></path><path d="M432 784h56v48H432z" fill="#EEEEEE" p-id="3557"></path><path d="M488 776H432a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h56a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8z m-8 48h-40v-32H480v32z" fill="#37474F" p-id="3558"></path><path d="M528 784h56v48H528z" fill="#EEEEEE" p-id="3559"></path><path d="M584 776H528a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h56a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8z m-8 48h-40v-32H576v32zM800 584H416a8 8 0 0 0 0 16h384a8 8 0 0 0 0-16z" fill="#37474F" p-id="3560"></path><path d="M304 272h608v32H304z" fill="#78909C" p-id="3561"></path><path d="M912 264H304a8 8 0 0 0-8 8v32a8 8 0 0 0 8 8h608a8 8 0 0 0 8-8v-32a8 8 0 0 0-8-8z m-8 32h-592v-16h592v16z" fill="#37474F" p-id="3562"></path><path d="M656 256h-96a16 16 0 0 0-16 16v72a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16V272a16 16 0 0 0-16-16z" fill="#78909C" p-id="3563"></path><path d="M656 248h-96c-13.232 0-24 10.768-24 24v72c0 13.232 10.768 24 24 24h96c13.232 0 24-10.768 24-24V272c0-13.232-10.768-24-24-24z m8 96a8 8 0 0 1-8 8h-96a8 8 0 0 1-8-8V272a8 8 0 0 1 8-8h96a8 8 0 0 1 8 8v72z" fill="#37474F" p-id="3564"></path><path d="M584 360v32L608 416l24-24v-32z" fill="#78909C" p-id="3565"></path><path d="M632 352h-48a8 8 0 0 0-8 8v32c0 2.128 0.848 4.16 2.336 5.664l24 24a8.032 8.032 0 0 0 11.328 0l24-24A8.064 8.064 0 0 0 640 392v-32a8 8 0 0 0-8-8z m-8 36.688l-16 16-16-16V368h32v20.688z" fill="#37474F" p-id="3566"></path><path d="M584 432v80h-80v80h160V432z" fill="#E64A19" p-id="3567"></path><path d="M664 424h-80a8 8 0 0 0-8 8v72h-72a8 8 0 0 0-8 8v80a8 8 0 0 0 8 8h160a8 8 0 0 0 8-8V432a8 8 0 0 0-8-8z m-8 160h-144v-64h72a8 8 0 0 0 8-8v-72h64v144z" fill="#37474F" p-id="3568"></path><path d="M632 432v80h-80v80h160V432z" fill="#FF7043" p-id="3569"></path><path d="M712 424h-80a8 8 0 0 0-8 8v72h-72a8 8 0 0 0-8 8v80a8 8 0 0 0 8 8h160a8 8 0 0 0 8-8V432a8 8 0 0 0-8-8z m-8 160h-144v-64h72a8 8 0 0 0 8-8v-72h64v144z" fill="#37474F" p-id="3570"></path></svg>`,
  },
  {
    title: "故障打印机",
    value: 32,
    suffix: "+20%",
    icon: `<svg t="1711696317166" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5413" id="mx_n_1711696317167" width="200" height="200"><path d="M736 112H96a80 80 0 0 0-80 80v640a80 80 0 0 0 80 80h640a80 80 0 0 0 80-80V192a80 80 0 0 0-80-80z" fill="#e32626" p-id="5414" data-spm-anchor-id="a313x.search_index.0.i16.4d493a81k7wgFv" class="selected"></path><path d="M736 104H96A88.096 88.096 0 0 0 8 192v640c0 48.528 39.472 88 88 88h640c48.528 0 88-39.472 88-88V192c0-48.528-39.472-88-88-88zM808 832c0 39.696-32.304 72-72 72H96A72.08 72.08 0 0 1 24 832V192c0-39.696 32.304-72 72-72h640c39.696 0 72 32.304 72 72v640z" fill="#37474F" p-id="5415"></path><path d="M928 112H288a80 80 0 0 0-80 80v640a80 80 0 0 0 80 80h640a80 80 0 0 0 80-80V192a80 80 0 0 0-80-80z" fill="#26C6DA" p-id="5416"></path><path d="M928 104H288a88.096 88.096 0 0 0-88 88v640c0 48.528 39.472 88 88 88h640c48.528 0 88-39.472 88-88V192c0-48.528-39.472-88-88-88zM1000 832c0 39.696-32.304 72-72 72H288a72.08 72.08 0 0 1-72-72V192c0-39.696 32.304-72 72-72h640c39.696 0 72 32.304 72 72v640z" fill="#37474F" p-id="5417"></path><path d="M288 872a40.048 40.048 0 0 1-40-40V192c0-22.048 17.952-40 40-40a8 8 0 0 0 0-16c-30.88 0-56 25.12-56 56v640c0 30.88 25.12 56 56 56a8 8 0 0 0 0-16z" fill="#80DEEA" p-id="5418"></path><path d="M96 872A40.048 40.048 0 0 1 56 832V192c0-22.048 17.952-40 40-40a8 8 0 0 0 0-16c-30.88 0-56 25.12-56 56v640c0 30.88 25.12 56 56 56a8 8 0 0 0 0-16z" fill="#26C6DA" p-id="5419"></path><path d="M928 136a8 8 0 0 0 0 16c22.048 0 40 17.952 40 40v640c0 22.048-17.952 40-40 40a8 8 0 0 0 0 16c30.88 0 56-25.12 56-56V192c0-30.88-25.12-56-56-56z" fill="#0097A7" p-id="5420"></path><path d="M872 208h-528a40 40 0 0 0-40 40v448a40 40 0 0 0 40 40H608l80-96h224V248a40 40 0 0 0-40-40z" fill="#e32626" p-id="5421" data-spm-anchor-id="a313x.search_index.0.i17.4d493a81k7wgFv" class="selected"></path><path d="M872 200h-528c-26.464 0-48 21.536-48 48v448c0 26.464 21.536 48 48 48H608a8 8 0 0 0 6.144-2.88l77.6-93.12H912a8 8 0 0 0 8-8V248c0-26.464-21.536-48-48-48z m32 432H688a8 8 0 0 0-6.144 2.88l-77.6 93.12H344c-17.648 0-32-14.352-32-32v-448c0-17.648 14.352-32 32-32h528c17.648 0 32 14.352 32 32v384z" fill="#37474F" p-id="5422"></path><path d="M720 688h112v48h-112z" fill="#EEEEEE" p-id="5423"></path><path d="M832 680h-112a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8z m-8 48h-96v-32h96v32z" fill="#37474F" p-id="5424"></path><path d="M888 712m-24 0a24 24 0 1 0 48 0 24 24 0 1 0-48 0Z" fill="#EEEEEE" p-id="5425"></path><path d="M888 680c-17.648 0-32 14.352-32 32s14.352 32 32 32 32-14.352 32-32-14.352-32-32-32z m0 48c-8.816 0-16-7.184-16-16s7.184-16 16-16 16 7.184 16 16-7.184 16-16 16z" fill="#37474F" p-id="5426"></path><path d="M336 784h56v48H336z" fill="#EEEEEE" p-id="5427"></path><path d="M392 776H336a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h56a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8z m-8 48h-40v-32H384v32z" fill="#37474F" p-id="5428"></path><path d="M432 784h56v48H432z" fill="#EEEEEE" p-id="5429"></path><path d="M488 776H432a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h56a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8z m-8 48h-40v-32H480v32z" fill="#37474F" p-id="5430"></path><path d="M528 784h56v48H528z" fill="#EEEEEE" p-id="5431"></path><path d="M584 776H528a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h56a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8z m-8 48h-40v-32H576v32zM800 584H416a8 8 0 0 0 0 16h384a8 8 0 0 0 0-16z" fill="#37474F" p-id="5432"></path><path d="M304 272h608v32H304z" fill="#78909C" p-id="5433"></path><path d="M912 264H304a8 8 0 0 0-8 8v32a8 8 0 0 0 8 8h608a8 8 0 0 0 8-8v-32a8 8 0 0 0-8-8z m-8 32h-592v-16h592v16z" fill="#37474F" p-id="5434"></path><path d="M656 256h-96a16 16 0 0 0-16 16v72a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16V272a16 16 0 0 0-16-16z" fill="#78909C" p-id="5435"></path><path d="M656 248h-96c-13.232 0-24 10.768-24 24v72c0 13.232 10.768 24 24 24h96c13.232 0 24-10.768 24-24V272c0-13.232-10.768-24-24-24z m8 96a8 8 0 0 1-8 8h-96a8 8 0 0 1-8-8V272a8 8 0 0 1 8-8h96a8 8 0 0 1 8 8v72z" fill="#37474F" p-id="5436"></path><path d="M584 360v32L608 416l24-24v-32z" fill="#78909C" p-id="5437"></path><path d="M632 352h-48a8 8 0 0 0-8 8v32c0 2.128 0.848 4.16 2.336 5.664l24 24a8.032 8.032 0 0 0 11.328 0l24-24A8.064 8.064 0 0 0 640 392v-32a8 8 0 0 0-8-8z m-8 36.688l-16 16-16-16V368h32v20.688z" fill="#37474F" p-id="5438"></path><path d="M584 432v80h-80v80h160V432z" fill="#E64A19" p-id="5439"></path><path d="M664 424h-80a8 8 0 0 0-8 8v72h-72a8 8 0 0 0-8 8v80a8 8 0 0 0 8 8h160a8 8 0 0 0 8-8V432a8 8 0 0 0-8-8z m-8 160h-144v-64h72a8 8 0 0 0 8-8v-72h64v144z" fill="#37474F" p-id="5440"></path><path d="M632 432v80h-80v80h160V432z" fill="#FF7043" p-id="5441"></path><path d="M712 424h-80a8 8 0 0 0-8 8v72h-72a8 8 0 0 0-8 8v80a8 8 0 0 0 8 8h160a8 8 0 0 0 8-8V432a8 8 0 0 0-8-8z m-8 160h-144v-64h72a8 8 0 0 0 8-8v-72h64v144z" fill="#37474F" p-id="5442"></path></svg>`,
  },
  {
    title: "工作打印机",
    value: 12,
    prefix: "+",
    status: "danger",
    suffix: "-20%",
    icon: `<svg t="1711696317166" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5413" id="mx_n_1711696317167" width="200" height="200"><path d="M736 112H96a80 80 0 0 0-80 80v640a80 80 0 0 0 80 80h640a80 80 0 0 0 80-80V192a80 80 0 0 0-80-80z" fill="#1afa29" p-id="5414" data-spm-anchor-id="a313x.search_index.0.i16.4d493a81k7wgFv" class="selected"></path><path d="M736 104H96A88.096 88.096 0 0 0 8 192v640c0 48.528 39.472 88 88 88h640c48.528 0 88-39.472 88-88V192c0-48.528-39.472-88-88-88zM808 832c0 39.696-32.304 72-72 72H96A72.08 72.08 0 0 1 24 832V192c0-39.696 32.304-72 72-72h640c39.696 0 72 32.304 72 72v640z" fill="#37474F" p-id="5415"></path><path d="M928 112H288a80 80 0 0 0-80 80v640a80 80 0 0 0 80 80h640a80 80 0 0 0 80-80V192a80 80 0 0 0-80-80z" fill="#26C6DA" p-id="5416"></path><path d="M928 104H288a88.096 88.096 0 0 0-88 88v640c0 48.528 39.472 88 88 88h640c48.528 0 88-39.472 88-88V192c0-48.528-39.472-88-88-88zM1000 832c0 39.696-32.304 72-72 72H288a72.08 72.08 0 0 1-72-72V192c0-39.696 32.304-72 72-72h640c39.696 0 72 32.304 72 72v640z" fill="#37474F" p-id="5417"></path><path d="M288 872a40.048 40.048 0 0 1-40-40V192c0-22.048 17.952-40 40-40a8 8 0 0 0 0-16c-30.88 0-56 25.12-56 56v640c0 30.88 25.12 56 56 56a8 8 0 0 0 0-16z" fill="#80DEEA" p-id="5418"></path><path d="M96 872A40.048 40.048 0 0 1 56 832V192c0-22.048 17.952-40 40-40a8 8 0 0 0 0-16c-30.88 0-56 25.12-56 56v640c0 30.88 25.12 56 56 56a8 8 0 0 0 0-16z" fill="#26C6DA" p-id="5419"></path><path d="M928 136a8 8 0 0 0 0 16c22.048 0 40 17.952 40 40v640c0 22.048-17.952 40-40 40a8 8 0 0 0 0 16c30.88 0 56-25.12 56-56V192c0-30.88-25.12-56-56-56z" fill="#0097A7" p-id="5420"></path><path d="M872 208h-528a40 40 0 0 0-40 40v448a40 40 0 0 0 40 40H608l80-96h224V248a40 40 0 0 0-40-40z" fill="#1afa29" p-id="5421" data-spm-anchor-id="a313x.search_index.0.i17.4d493a81k7wgFv" class="selected"></path><path d="M872 200h-528c-26.464 0-48 21.536-48 48v448c0 26.464 21.536 48 48 48H608a8 8 0 0 0 6.144-2.88l77.6-93.12H912a8 8 0 0 0 8-8V248c0-26.464-21.536-48-48-48z m32 432H688a8 8 0 0 0-6.144 2.88l-77.6 93.12H344c-17.648 0-32-14.352-32-32v-448c0-17.648 14.352-32 32-32h528c17.648 0 32 14.352 32 32v384z" fill="#37474F" p-id="5422"></path><path d="M720 688h112v48h-112z" fill="#EEEEEE" p-id="5423"></path><path d="M832 680h-112a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8z m-8 48h-96v-32h96v32z" fill="#37474F" p-id="5424"></path><path d="M888 712m-24 0a24 24 0 1 0 48 0 24 24 0 1 0-48 0Z" fill="#EEEEEE" p-id="5425"></path><path d="M888 680c-17.648 0-32 14.352-32 32s14.352 32 32 32 32-14.352 32-32-14.352-32-32-32z m0 48c-8.816 0-16-7.184-16-16s7.184-16 16-16 16 7.184 16 16-7.184 16-16 16z" fill="#37474F" p-id="5426"></path><path d="M336 784h56v48H336z" fill="#EEEEEE" p-id="5427"></path><path d="M392 776H336a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h56a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8z m-8 48h-40v-32H384v32z" fill="#37474F" p-id="5428"></path><path d="M432 784h56v48H432z" fill="#EEEEEE" p-id="5429"></path><path d="M488 776H432a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h56a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8z m-8 48h-40v-32H480v32z" fill="#37474F" p-id="5430"></path><path d="M528 784h56v48H528z" fill="#EEEEEE" p-id="5431"></path><path d="M584 776H528a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h56a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8z m-8 48h-40v-32H576v32zM800 584H416a8 8 0 0 0 0 16h384a8 8 0 0 0 0-16z" fill="#37474F" p-id="5432"></path><path d="M304 272h608v32H304z" fill="#78909C" p-id="5433"></path><path d="M912 264H304a8 8 0 0 0-8 8v32a8 8 0 0 0 8 8h608a8 8 0 0 0 8-8v-32a8 8 0 0 0-8-8z m-8 32h-592v-16h592v16z" fill="#37474F" p-id="5434"></path><path d="M656 256h-96a16 16 0 0 0-16 16v72a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16V272a16 16 0 0 0-16-16z" fill="#78909C" p-id="5435"></path><path d="M656 248h-96c-13.232 0-24 10.768-24 24v72c0 13.232 10.768 24 24 24h96c13.232 0 24-10.768 24-24V272c0-13.232-10.768-24-24-24z m8 96a8 8 0 0 1-8 8h-96a8 8 0 0 1-8-8V272a8 8 0 0 1 8-8h96a8 8 0 0 1 8 8v72z" fill="#37474F" p-id="5436"></path><path d="M584 360v32L608 416l24-24v-32z" fill="#78909C" p-id="5437"></path><path d="M632 352h-48a8 8 0 0 0-8 8v32c0 2.128 0.848 4.16 2.336 5.664l24 24a8.032 8.032 0 0 0 11.328 0l24-24A8.064 8.064 0 0 0 640 392v-32a8 8 0 0 0-8-8z m-8 36.688l-16 16-16-16V368h32v20.688z" fill="#37474F" p-id="5438"></path><path d="M584 432v80h-80v80h160V432z" fill="#E64A19" p-id="5439"></path><path d="M664 424h-80a8 8 0 0 0-8 8v72h-72a8 8 0 0 0-8 8v80a8 8 0 0 0 8 8h160a8 8 0 0 0 8-8V432a8 8 0 0 0-8-8z m-8 160h-144v-64h72a8 8 0 0 0 8-8v-72h64v144z" fill="#37474F" p-id="5440"></path><path d="M632 432v80h-80v80h160V432z" fill="#FF7043" p-id="5441"></path><path d="M712 424h-80a8 8 0 0 0-8 8v72h-72a8 8 0 0 0-8 8v80a8 8 0 0 0 8 8h160a8 8 0 0 0 8-8V432a8 8 0 0 0-8-8z m-8 160h-144v-64h72a8 8 0 0 0 8-8v-72h64v144z" fill="#37474F" p-id="5442"></path></svg>`,
  },
];
const findKeyValuePairIndex = (arr, key, value) => {
  return arr.findIndex(item => item[key] === value)
}
const checkDisabled = (node) => {
  return node.every(child => {
    return child.hasOwnProperty('disabled') && child.disabled === true
  })
}
export default {
  components: {
    Notification,
    CardBarChart,
    WidgetCounter,
    AddPrinter,
  },
  data() {
    return {
      // Counter Widgets Stats
      stats,
      printer_data: [],
      sider_width: 370,
      check_printers: [],
      check_tree_data: [],
      check_printer_name: [],
      onlinePrinterArray: [],
      batchOperationButtonEnabled: true,
      uploadButtonLoading: false,
    }
  },
  computed: {
    userInfo() {
      let userInfo = this.$store.getters.getUserInfo;
      console.log({email: userInfo.email, username: userInfo.username})
      return {email: userInfo.email, username: userInfo.username};
    },
    printerTreeData() {
      // let data = this.$store.getters.getOnlinePrinter.slice();
      let data = JSON.parse(JSON.stringify(this.$store.getters.getOnlinePrinter.slice()));
      let name_index = findKeyValuePairIndex(data, 'title', this.printer_name)
      if (name_index !== -1) {
        let id_index = findKeyValuePairIndex(data[name_index].children, 'key', this.printer_sn)
        if (id_index !== -1) {
          data[name_index].children[id_index]['disabled'] = true
        }
        if (checkDisabled(data[name_index].children) === true) {
          data[name_index]['disabled'] = true
        }
      }
      return data
    },
    selectedPrintFiles() {
      console.log(this.$store.getters.getSelectedPrintFile)
      return this.$store.getters.getSelectedPrintFile
    }
  },
  watch: {
    userInfo(newVal, oldVal) {
      console.log('userInfo 变化了：', oldVal, '->', newVal);
      // 在这里处理 userInfo 变化的逻辑
    },
    check_tree_data(newVal, oldVal) {
      this.$nextTick(() => {
        console.log('Old value:', oldVal);
        console.log('New value:', newVal);
      });
      this.batchOperationButtonEnabled = newVal.length === 0;
      const addedItems = newVal.filter((item) => !oldVal.includes(item));
      const removedItems = oldVal.filter((item) => !newVal.includes(item));
      console.log('addedItems', addedItems)
      console.log('removedItems', removedItems)
      let add_printer_name;
      for (let i = 0; i < addedItems.length; i++) {
        for (let j = 0; j < this.printer_data.length; j++) {
          if (addedItems[i] === this.printer_data[j].id) {
            if (this.check_printer_name.length < 2) {
              this.check_printer_name.push(this.printer_data[j].describe);
            }
            add_printer_name = this.printer_data[j].name
            this.printer_data[j].check = true
            break
          }
        }
        if (!this.check_printers.includes(addedItems[i]) && addedItems[i].length === 39) {
          this.check_printers.push(addedItems[i])
        }
      }
      for (let i = 0; i < removedItems.length; i++) {
        for (let j = 0; j < this.printer_data.length; j++) {
          if (removedItems[i] === this.printer_data[j].id) {
            let index = this.check_printer_name.indexOf(this.printer_data[j].describe)
            if (index !== -1) {
              this.check_printer_name.splice(index, 1);
            }
            console.log('this.printer_data[j].check = false', this.printer_data[j])
            this.printer_data[j].check = false
            break
          }
        }
        let index = this.check_printers.indexOf(removedItems[i])
        if (index !== -1) {
          this.check_printers.splice(index, 1)
        }
      }
      if (add_printer_name) {
        for (let i = 0; i < this.printer_data.length; i++) {
          if (this.printer_data[i].name !== add_printer_name) {
            this.printer_data[i].check = false;
            this.printer_data[i].check_button_props_enable = true;
          }
        }
        for (let i = 0; i < this.printerTreeData.length; i++) {
          if (this.printerTreeData[i].title !== add_printer_name) {
            this.printerTreeData[i].disabled = true
            for (let j = 0; j < this.printerTreeData[i].children.length; j++) {
              this.printerTreeData[i].children[j].disabled = true
            }
          }
        }
      }
      if (newVal.length === 0) {
        for (let i = 0; i < this.printer_data.length; i++) {
          this.printer_data[i].check = false;
          this.printer_data[i].check_button_props_enable = false;
        }
        for (let i = 0; i < this.printerTreeData.length; i++) {
          this.printerTreeData[i].disabled = false
          for (let j = 0; j < this.printerTreeData[i].children.length; j++) {
            this.printerTreeData[i].children[j].disabled = false
          }
        }
      }
    }
  },
  mounted() {
    this.$socket.on('shareFile', (data) => {
      this.selectPrinterConfirmLoading = false;
      console.log(data)
      if (data.state === 'success') {
        this.$message.success(`共享文件到${data.printer_id}已完成！`)
      } else {
        this.$message.error('出错了！分享文件失败！')
      }
    })
    this.updateScreenSize(); // 初始化屏幕尺寸
    window.addEventListener('resize', this.updateScreenSize); // 添加事件监听器
    this.$socket.on('printerData', (data) => {
      let printers = data.printers
      for (let i = 0; i < printers.length; i++) {
        if (!this.printer_data.includes(printers[i])) {
          this.printer_data.push(printers[i])
        }
        if (printers[i].status === 'online') {
          let name_index = findKeyValuePairIndex(this.onlinePrinterArray, 'title', printers[i].name)
          if (name_index === -1) {
            this.onlinePrinterArray.push({
              'title': this.printer_data[i].name,
              'children': [{
                'title': printers[i].describe,
                'key': printers[i].id
              }]
            })
            this.$store.dispatch('updateOnlinePrinter', this.onlinePrinterArray)
          } else {
            let id_index = findKeyValuePairIndex(this.onlinePrinterArray[name_index].children, 'key', printers[i].id)
            if (id_index === -1) {
              this.onlinePrinterArray[name_index].children.push({
                'title': printers[i].describe,
                'key': printers[i].id
              })
              this.$store.dispatch('updateOnlinePrinter', this.onlinePrinterArray)
            }
          }
        }
      }
    })
    this.$socket.on('joinRoom', (data) => {
      for (let i = 0; i < this.printer_data.length; i++) {
        if (this.printer_data[i].id === data.printer_id) {
          this.printer_data[i].status = data.status
          if (data.status === 'online') {
            let name_index = findKeyValuePairIndex(this.onlinePrinterArray, 'title', this.printer_data[i].name)
            if (name_index === -1) {
              this.onlinePrinterArray.push({
                'title': this.printer_data[i].name,
                'children': [{
                  'title': data.printer_describe,
                  'key': data.printer_id
                }]
              })
              this.$store.dispatch('updateOnlinePrinter', this.onlinePrinterArray)
            } else {
              let id_index = findKeyValuePairIndex(this.onlinePrinterArray[name_index].children, 'key', data.printer_id)
              if (id_index === -1) {
                this.onlinePrinterArray[name_index].children.push({
                  'title': data.printer_describe,
                  'key': data.printer_id
                })
                this.$store.dispatch('updateOnlinePrinter', this.onlinePrinterArray)
              }
            }
          } else {
            let name_index = findKeyValuePairIndex(this.onlinePrinterArray, 'title', this.printer_data[i].name)
            if (name_index !== -1) {
              let id_index = findKeyValuePairIndex(this.onlinePrinterArray[name_index].children, 'key', data.printer_id)
              if (id_index !== -1) {
                this.onlinePrinterArray[name_index].children.splice(id_index, 1)
                if (this.onlinePrinterArray[name_index].children.length === 0) {
                  this.onlinePrinterArray.splice(name_index, 1)
                  this.$store.dispatch('updateOnlinePrinter', this.onlinePrinterArray)
                }
              }
            }
          }
        }
      }
      console.log(this.printer_data)
    })
    this.$socket.on('deletePrinter', (data) => {
      if (data.state === 'success') {
        for (let i = 0; i < this.printer_data.length; i++) {
          if (this.printer_data[i].id === data.id) {
            this.printer_data.splice(i, 1)
          }
        }
        this.onShowNotification('success', {
          title: '成功！',
          description: '删除成功！',
        })
      } else if (data.state === 'PrinterNotExists') {
        this.onShowNotification('error', {
          title: '错误！',
          description: '打印机不存在！',
        })
      } else if (data.state === 'UserNotExists') {
        this.onShowNotification('error', {
          title: '错误！',
          description: '用户信息不存在！',
        })
        this.$router.push({name: 'Sign-In', params: {data: '1'}})
      } else {
        this.onShowNotification('error', {
          title: '错误！',
          description: '删除失败！未知错误',
        })
      }
    })
    // this.$socket.on('printControl', (data) => {
    //   const print_action = {
    //     start: '开始',
    //     suspend: '暂停',
    //     cease: '停止'
    //   }
    //   if (data.result === true) {
    //     this.$message.success(`打印机${data.printer_id}${print_action[data.action]}打印成功!`)
    //   } else {
    //     this.$message.error(`打印机${data.printer_id}${print_action[data.action]}打印失败!`)
    //   }
    // })
    this.$socket.on('printerStatus', (data) => {
      if (data.role === 'printer') {
        for (let i = 0; i < this.printer_data; i++) {
          if (this.printer_data[i].id === data.printer_id) {
            this.printer_data.print_status = data.print_status
          }
        }
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateScreenSize); // 移除事件监听器
  },
  methods: {
    openFileDialog() {
      this.$refs.fileInput.click();
    },
    async onFileSelected(event) {
      this.uploadButtonLoading = true
      await this.$socket.emit('shareFile', {
        printer_id: this.userInfo.email,
        share_printer_id: this.check_printers
      })
      const file = event.target.files[0];
      const chunkSize = 1024 * 512
      const chunksCount = Math.ceil(file.size / chunkSize)
      for (let i = 0; i < chunksCount; i++) {
        const chunkStart = i * chunkSize;
        const chunkEnd = Math.min(chunkStart + chunkSize, file.size);
        const chunk = file.slice(chunkStart, chunkEnd);

        await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const chunkData = event.target.result;
            console.log(`Chunk ${i + 1} of ${chunksCount}:`, chunkData);
            // 在这里处理分段数据，例如显示内容或将其发送到服务器
            this.$socket.emit('sendFile', {
              data: chunkData,
              filename: file.name,
              printer_id: this.userInfo.email,
              sending_complete: false
            });
            resolve();
          };
          reader.readAsArrayBuffer(chunk);
        });
      }
      const chunkData = new Uint8Array(0)
      this.$socket.emit('sendFile', {
        data: chunkData,
        filename: file.name,
        printer_id: this.userInfo.email,
        sending_complete: true
      })
      this.uploadButtonLoading = false
    },
    updateScreenSize() {
      if (window.innerWidth > (screen.width * 0.6)) {
        this.sider_width = (window.innerWidth / 5);
      } else {
        this.sider_width = 0;
      }
    },
    updateNewPrinterData(data) {
      this.printer_data.push(data)
    },
    checkPrinter(data) {
      let check_printer_name;
      if (data[1]) {
        this.check_printers.push(data[0])
        this.check_tree_data.push(data[0])
        this.$message.success('打印机 ' + data[0] + ' 已选中！');
        for (let j = 0; j < this.printer_data.length; j++) {
          if (data[0] === this.printer_data[j].id) {
            check_printer_name = this.printer_data[j].name
            if (this.check_printer_name.length < 2) {
              this.check_printer_name.push(this.printer_data[j].describe);
            }
            this.printer_data[j].check = true
            break
          }
        }
      } else {
        this.$message.warning('打印机 ' + data[0] + ' 已取消选中！');
        let indexToRemove = this.check_printers.indexOf(data[0]);
        if (indexToRemove !== -1) {
          this.check_printers.splice(indexToRemove, 1);
        }
        indexToRemove = this.check_tree_data.indexOf(data[0]);
        if (indexToRemove !== -1) {
          this.check_tree_data.splice(indexToRemove, 1);
        }
        for (let j = 0; j < this.printer_data.length; j++) {
          if (data[0] === this.printer_data[j].id) {
            let index = this.check_printer_name.indexOf(this.printer_data[j].describe)
            if (index !== -1) {
              this.check_printer_name.splice(index, 1);
            }
            break
          }
        }
      }
      if (this.check_printers.length === 1 && check_printer_name !== undefined) {
        for (let i = 0; i < this.printer_data.length; i++) {
          if (this.printer_data[i].name !== check_printer_name) {
            this.printer_data[i].check = false;
            this.printer_data[i].check_button_props_enable = true;
          }
        }
        for (let i = 0; i < this.printerTreeData.length; i++) {
          if (this.printerTreeData[i].title !== check_printer_name) {
            this.printerTreeData[i].disabled = true
            for (let j = 0; j < this.printerTreeData[i].children.length; j++) {
              this.printerTreeData[i].children[j].disabled = true
            }
          }
        }
      } else if (this.check_printers.length === 0) {
        for (let i = 0; i < this.printer_data.length; i++) {
          this.printer_data[i].check = false;
          this.printer_data[i].check_button_props_enable = false;
        }
        for (let i = 0; i < this.printerTreeData.length; i++) {
          this.printerTreeData[i].disabled = false
          for (let j = 0; j < this.printerTreeData[i].children.length; j++) {
            this.printerTreeData[i].children[j].disabled = false
          }
        }
      }
    },
    onShowNotification(type, info) {
      const notificationType = {
        open: (info) => {
          this.$nextTick(() => {
            this.$refs.addPrinterNotification.open(info)
          })
        },
        info: (info) => {
          this.$nextTick(() => {
            this.$refs.addPrinterNotification.info(info)
          })
        },
        success: (info) => {
          this.$nextTick(() => {
            this.$refs.addPrinterNotification.success(info)
          })
        },
        error: (info) => {
          this.$nextTick(() => {
            this.$refs.addPrinterNotification.error(info)
          })
        },
        warn: (info) => {
          this.$nextTick(() => {
            this.$refs.addPrinterNotification.warn(info)
          })
        },
      };
      notificationType[type](info); // 传入type调用
    },
    onClose() { // 点击默认关闭按钮时触发的回调函数
      console.log('关闭notification')
    },
    printControl(action, printer_id = this.check_printers) {
      if (printer_id.length === 0) {
        this.$message.warning("请先选择要开始打印的打印机！")
      } else if (this.selectedPrintFiles.length === 0) {
        this.$message.warning("请先选择要打印的文件！")
      } else {
        this.$socket.emit('printControl', {
          role: "user",
          printer_id: printer_id,
          method: 'print_control',
          action: action,
          filename_list: this.selectedPrintFiles
        })
      }
    },
    motionControl(method, axis, distance = null) {
      const params = {
        'move': {
          "position_mode": "relative",
          "x": axis === 'x' ? distance : null,
          "y": axis === 'y' ? distance : null,
          "z": axis === 'z' ? distance : null,
          "e": axis === 'e' ? distance : null,
          "speed": 0,
          "force_move": null,
        },
        'change_active_extruder': {
          "params": axis
        },
        'auto_load_filament': {
          "extruder": axis,
          "dir": "distance",
        },
        'home': axis
      };
      this.$socket.emit('motionControl', {
        'role': 'user',
        'printer_id': this.check_printers,
        'method': method,
        'params': params[method]
      })
    }
  },
}

</script>

<style scoped>
.all-row {
  padding-top: 3px;
  padding-bottom: 3px;
}

.col-up-down {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.col-left-right {
  height: 100px;
  display: flex;
  flex-direction: column;
  align-content: center;
  flex-wrap: wrap;
}

.button-left-right {
  width: 150%;
  height: 100%;

}

.all-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-content: center;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.icon-small {
  font-size: 28px;
  color: #1890FF;
}

.icon-medium {
  font-size: 32px;
  color: #1890FF;
}

.icon-large {
  font-size: 44px;
  color: #1890FF;
}

.all-button:hover {
  background-color: #FAFAFA;
}

.all-num-button {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-content: center;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border-color: #FAFAFA;
  background-color: #1890FF;
  color: #FAFAFA;
  cursor: pointer;
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
}

.widget-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon {
  width: 48px;
  height: 48px;
  top: 0;
  bottom: 0;
  right: 16px;
  margin: auto;
  background-color: transparent;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.12);
}

.select-title {
  font-family: "open sans", Helvetica, Arial, sans-serif;
  font-weight: 600;
  color: #8C8C8C;
  font-size: 14px;
}

.item1 {
  flex: 1;
  margin-right: 5px;
}

.hover-class {
  cursor: pointer;
}

/deep/ .ant-tooltip-inner {
  background-color: #1890FF;
  color: #ffffff;
  white-space: nowrap;
}

/deep/ .ant-tooltip-arrow::before {
  background-color: #1890FF;
}

/deep/ .ze-button:disabled {
  background-color: #eae8e8;
  color: white;
  cursor: not-allowed;
}

/deep/ .ze-arrow-button:disabled {
  cursor: not-allowed;
}

/deep/ .all-button:disabled i {
  color: #eae8e8;
}
</style>