const express = require('express');
const router = express.Router();



function getPackageByAudienceSize(audienceSize) {
    switch (audienceSize) {
        case '1-10':
            return {
                price: 500,
                equipment: {
                    speakers: {
                        quantity: 2,
                        description: '12-inch powered speakers'
                    },
                    mixer: {
                        quantity: 1,
                        description: '8-channel mixer'
                    },
                    microphones: {
                        quantity: 2,
                        description: 'Wireless handheld microphones'
                    },
                    lights: {
                        quantity: 2,
                        description: 'LED PAR stage lights'
                    }
                }
            };

        case '1-30':
            return {
                price: 1000,
                equipment: {
                    speakers: {
                        quantity: 4,
                        description: '15-inch powered speakers'
                    },
                    mixer: {
                        quantity: 1,
                        description: '16-channel digital mixer'
                    },
                    microphones: {
                        quantity: 4,
                        description: 'Wireless microphones (2 handheld, 2 lapel)'
                    },
                    lights: {
                        quantity: 4,
                        description: 'LED PAR stage lights with DMX controller'
                    }
                }
            };

        case '1-50':
            return {
                price: 1500,
                equipment: {
                    speakers: {
                        quantity: 6,
                        description: '15-inch powered speakers with stands'
                    },
                    subwoofer: {
                        quantity: 3,
                        description: '18-inch powered subwoofers'
                    },
                    mixer: {
                        quantity: 1,
                        description: '32-channel digital mixer with effects'
                    },
                    microphones: {
                        quantity: 6,
                        description: 'Professional wireless microphones (4 handheld, 2 lapel)'
                    },
                    lights: {
                        quantity: 8,
                        description: 'LED PAR lights with moving heads and DMX controller'
                    }
                }
            };

        case '1-100':
            return {
                price: 2000,
                equipment: {
                    speakers: {
                        quantity: 6,
                        description: '15-inch powered speakers with stands'
                    },
                    subwoofer: {
                        quantity: 3,
                        description: '18-inch powered subwoofers'
                    },
                    mixer: {
                        quantity: 1,
                        description: '32-channel digital mixer with effects'
                    },
                    microphones: {
                        quantity: 6,
                        description: 'Professional wireless microphones (4 handheld, 2 lapel)'
                    },
                    lights: {
                        quantity: 8,
                        description: 'LED PAR lights with moving heads and DMX controller'
                    }
                }
            };

        case 'More than 100':
            return {
                price: 2500,
                equipment: {
                    speakers: {
                        quantity: 6,
                        description: '15-inch powered speakers with stands'
                    },
                    subwoofer: {
                        quantity: 3,
                        description: '18-inch powered subwoofers'
                    },
                    mixer: {
                        quantity: 1,
                        description: '32-channel digital mixer with effects'
                    },
                    microphones: {
                        quantity: 6,
                        description: 'Professional wireless microphones (4 handheld, 2 lapel)'
                    },
                    lights: {
                        quantity: 8,
                        description: 'LED PAR lights with moving heads and DMX controller'
                    }
                }
            };

        default:
            return {
                price: 3000,
                equipment: {
                    speakers: {
                        quantity: 8,
                        description: 'Line array speakers with amplifiers'
                    },
                    subwoofer: {
                        quantity: 4,
                        description: 'Dual 18-inch powered subwoofers'
                    },
                    mixer: {
                        quantity: 1,
                        description: '48-channel digital mixer with redundant backup'
                    },
                    microphones: {
                        quantity: 8,
                        description: 'Professional wireless microphones (6 handheld, 2 lapel)'
                    },
                    lights: {
                        quantity: 12,
                        description: 'Full lighting rig with moving heads, spots, and DMX controller'
                    }
                }
            };
    }
}

module.exports = {
    getPackageByAudienceSize
};