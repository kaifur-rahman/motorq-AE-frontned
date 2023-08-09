const adminMenu= [
    {name:"Create Workflow",url:"/auth/admin"},
    {name:"Dashboard",url:"/auth/admin/dashboard"},
    {name:"Audit Page",url:"/auth/admin/audit"},
    {name:"Logout",url:"/"}
    ,
];
const requesterMenu=[
    {name:"Apply Request",url:"/auth/requester"},
    {name:"Request History",url:"/auth/requester/history"},
    {name:"Logout",url:"/"},
];

const approverMenu=[
    {name:"Dashboard",url:"/auth/approver"},
    {name:"Logout",url:"/"}
    ];

export {adminMenu,requesterMenu,approverMenu};