class router {
    constructor(arr, def) {
        this.routers = arr;
        this.oldPath = '';
        this.def = def;
        if(!window.location.hash.split('#')[1]) {

            this.go(def ? def : this.routers[0].path);
        }else {
            this.go(window.location.hash.split('#')[1]);
        }
        this.onChange();
    }

    onChange() {
        window.addEventListener('hashchange', ()=> {

            let hash = window.location.hash.split('#')[1].split('?')[0];

            if(this.oldPath == hash) return;

            let goRouter = this.routers.filter(v => v.path == hash)[0];

            this.go(goRouter ? window.location.hash.split('#')[1] : this.def);
        });
    }

    go(path) {
        window.location.hash = path;

        this.oldPath = path.split('?')[0];

        let comp = this.routers.filter(v => v.path == path.split('?')[0]);
        
        comp[0] ? comp[0].render(this) : this.go(this.def);
    }
    replace(path) {

        window.location.replace(`${window.location.hash.split('#')[0]}#${path}`);
    }

    getQueryString(key) {
        let query = window.location.hash.split('?')[1];
        let jg = '';
        query && query.split('&').forEach( (v,i,a) => {
            let querySplit = v.split('=');
            if(querySplit && querySplit[0] == key) {
                jg = querySplit[1];
            }
        });

        return jg;
    }
}


export default router;