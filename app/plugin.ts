let plugin = {
    load(param?: any, req?: any, loadCallback?: any) {
        loadCallback && loadCallback({content: param});
    }
}

export = plugin;