Clonoz.Application.Application.create({
	view: Clonoz.View.Main.Main,
	routes: {
		'page/{tab}:?get:': { 'default': { controller: 'main', action: 'TabNavigate' } },
		':controller:/:action::?get:': { 'default': { controller: 'main', action: 'Index' } }
	}
});