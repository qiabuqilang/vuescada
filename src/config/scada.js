export default{
  arrImgHouse: [
    {
      id: 1,
      name: '风机',
      img: require('@/assets/pilotlamp/ic_lamp_state1.svg'),
      selected: true,
      children: [
        {
          id: 2,
          img: require('@/assets/pilotlamp/ic_lamp_state1.svg'),
        },
        {
          id: 3,
          img: require('@/assets/pilotlamp/ic_lamp_state2.svg'),
        },
        {
          id: 4,
          img: require('@/assets/pilotlamp/ic_lamp_state3.svg'),
        },
        {
          id: 5,
          img: require('@/assets/pilotlamp/ic_lamp_state4.svg'),
        },
        {
          id: 6,
          img: require('@/assets/pilotlamp/ic_lamp_state5.svg'),
        },
        {
          id: 7,
          img: require('@/assets/pilotlamp/ic_lamp_state6.svg'),
        },
      ],
    },
    {
      id: 8,
      name: '风机',
      img: require('@/assets/fan/ic_fengshan_bianpin.svg'),
      selected: false,
      children: [                      
        {
          id: 9,
          img: require('@/assets/fan/ic_fengshan_bianpin.svg'),
        },
        {
          id: 10,
          img: require('@/assets/fan/ic_fengshan_gongpin.svg'),
        },
        {
          id: 11,
          img: require('@/assets/fan/ic_fengshan_guzhang.svg'),
        },
        {
          id: 12,
          img: require('@/assets/fan/ic_fengshan_weitouru.svg'),
        },
        {
          id: 13,
          img: require('@/assets/fan/ic_fengshan_yuanting.svg'),
        },
        {
          id: 14,
          img: require('@/assets/fan/ic_fengshan_daiji.svg'),
        },
                
      ],
    },
  ],
  attr: {
    line: {
      color: 'shape.border.color',
      width: 'shape.border.width',
    },
    standard: {
      background: 'shape.background',
      borderColor: 'shape.border.color',
      borderWidth: 'shape.border.width',      
    },
    pipe: {
      borderWidth: 'shape.border.width',
      borderColor: 'shape.border.color',
      dashWidth: 'shape.dash.width',
      blockLength: 'shape.dash.pattern',
      blockSpacing: 'shape.dash.pattern',
      dashColor: 'shape.dash.color',
      flowDirection: 'shape.dash.flow.reverse',
    },
    text: {
      fontSize: 'fontSize', 
      color: 'color',
      fontWeight: 'fontWeight', 
      fontStyle: 'fontStyle',
    },
    yezhu: {
      background: 'shape.background',
    },
  },
};