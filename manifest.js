wApps.manifest.apps.push(

  
    {
    "name": "Login@ S3DB.UAB",
    "description": "<p>Very simple login into UAB's S3DB cloud deployment using jmat's toolbox.<br> The login credentials will be stored at wApps.s3db.info.",
    "url": "https://code.google.com/p/jmat/", // home page of App
    "namespace":'jmat',
    buildUI:function(id){
        this.require('https://jmat.googlecode.com/git/jmat.js',
            function(){
                $('<div id="'+id+'_s3dbLogin">').appendTo($('#'+id));// create login div
                var url = 'https://uab.s3db.org/s3db'
                jmat.s3db.UI.login(
                    url,
                    function(){
                        wApps.s3db=jmat.s3db.info;
                        console.log('s3db login successful :-)');
                        $('<div>Logged in at '+url+': <p><smal><em>'+JSON.stringify(wApps.s3db.uid)+'</em></small></p>').appendTo($('#'+id));
                    },
                    id+'_s3dbLogin'
                )
                //console.log(id);
            });
        }
    },

    {
    "name": "someWApp",
    "description": "Some wApp one of you links here",
    "url": "http://uab.mathbiol.org/workshop",
    "namespace":'Some_wAapp',
    buildUI:function(id){
        this.require('', // script to load your code 
            function(){
                $('#'+id).html("<h1>Some wApp</h1>Some Application you developped and want to wApp here");
            });
        }
    }
);

wApps.manifest.authors.push(
    {
    }
);

wApps.manifest.brand={
    pic:'brand.png',
    url:'http://en.wikipedia.org/wiki/s3db'
};

wApps.manifest.checkedApps=[];

wApps.manifest.bodies={
    "myApps":{
        html:'Apps you selected from the AppStore ...',
        Div:{} // where the DOM element will be set later 
    },
    "Store":{
        html:'Retrieving list of Apps from the manifest ...',
        Div:{}
    },
    "People":{
        html:'Retrieving list of people authoring Apps ...',
        Div:{}
    },
    "About":{
        html:'<h1>wApps</h1>This is an experiment in loosening the architecture of a webApp store to achieve a deeper integration between autonomously developed components.',
        Div:{}
    }
};


// this will move someday
for(var i in wApps.manifest.apps){
    wApps.manifest.apps[i].require=function(url,fun){
        if(!window[this.namespace]){
            wApps.load(url,fun)
        }else(fun());
    }
}
