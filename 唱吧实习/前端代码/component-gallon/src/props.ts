export const props = {
  rewardPreviewList: {
    type: Array,
    required: true,
    default: () => [],
  },
  request: {
    type: Function,
    required: true,
  },
  lotteryDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  silence: {
    type: Boolean,
    required: false,
    default: false,
  },
  minLoop: {
    type: Number,
    required: false,
    default: 4,
  },
  speedRate: {
    type: Array,
    required: false,
    default: () => [200, 180, 170, 150, 140, 130, 120, 90, 85, 80, 75, 70, 60],
  },
  pos: {
    type: Number,
    default: 1,
    required: false,
  },
  rewardPk: {
    type: String,
    required: false,
    default: 'id',
  },
}
