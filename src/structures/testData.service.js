export const testData ={
    title : 'create todo process payroll',
    longTitle : "this title has just enough characters to validate.",
    tolongTitle : "create todo process payroll create todo process payroll create todo process payroll create todo process payroll",
    invalidDoneStatus :'bob',
    priority : " test",
    updateTitle : "updated title",
    description : 'create todo process payroll',
    toLongDescription : "Should trigger a 400 error because this description is too long and exceeds the maximum length of 200 characters. We should do additional testing to make sure that 200 is valid. And check large strings",
    longDescription: "This description has just enough characters to validate because it is exactly 200 characters in length. I had to use a tool to check this - so I should have used a CounterString to be absolutely sure.",
    textXML: '<todo><doneStatus>true</doneStatus><title>file paperwork today</title></todo>',
    authorizationIncorrect: 'Basic YWRtaW4gOmFkbWlu',
    authorizationCorrect:   'Basic YWRtaW46cGFzc3dvcmQ=',
    notExistId : 55,
    existId : 2,
    existId2 : 3,
    textHuge : `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vivamus hendrerit, nisi nec hendrerit fermentum, nunc sapien sodales velit,
    in ultricies mi orci sed justo. Etiam convallis viverra risus, eu tincidunt sem. Duis feugiat dapibus ligula, sed aliquam lectus varius non. 
    Curabitur sit amet lacus id velit tempor tristique id quis purus. Pellentesque id urna nulla. Proin eget eros sit amet ligula blandit tristique sed ut augue.
     Nulla auctor ligula eget odio viverra, a condimentum ligula vehicula. Maecenas id congue risus. Nam condimentum libero metus, et aliquet sapien consectetur in.
    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis pharetra id nulla non tempus. Fusce ultricies tincidunt dolor et rhoncus.
    Vestibulum feugiat, eros nec dictum posuere, lorem justo rhoncus mi, sit amet tincidunt arcu quam id quam. Nam pellentesque tortor eget libero suscipit tincidunt.
    Suspendisse potenti.Vestibulum mollis erat sed ligula sollicitudin sodales. Proin vehicula fermentum nisi nec vehicula. Integer non enim mauris. 
    Suspendisse potenti. Duis pharetra, felis at ornare viverra, magna nisi dictum odio, vel lacinia ligula nulla et lacus. Vivamus pharetra ante id odio dignissim venenatis. 
    Donec suscipit sagittis lacus vel tincidunt. Vestibulum sit amet nisi nisi. Mauris ac tempor ligula. Pellentesque ornare turpis quis consectetur rutrum. Morbi in justo nec velit scelerisque tristique at non lacus. 
    Donec faucibus mollis augue, ut vehicula nisl gravida in. Praesent eu felis eu est faucibus porttitor sed sit amet urna.Aliquam pretium velit in felis condimentum dapibus.
    Pellentesque euismod ultrices arcu ac venenatis. Aliquam erat volutpat. Vivamus maximus malesuada dui, eget venenatis lorem convallis in.
    Sed convallis convallis sapien, quis vestibulum purus varius vitae. Nam convallis nisl nec mi dapibus, eget facilisis eros vulputate. 
    Integer quis nibh dolor. Cras ac viverra lectus. Integer sagittis, nisl sit amet efficitur eleifend, erat ipsum suscipit lectus, et pellentesque ex ligula eget risus.
    Nullam faucibus consectetur ultricies. Ut vel mauris eros.Suspendisse gravida leo turpis, vel euismod mi dignissim quis. Integer et consectetur magna. Curabitur auctor interdum ipsum, 
    non consequat odio pellentesque nec. Fusce pellentesque sem ac turpis vehicula, nec varius lacus tincidunt. Etiam suscipit, purus non vestibulum gravida,
    sem sem volutpat orci, quis egestas ipsum purus a arcu. Ut id eros in sem vehicula hendrerit eget sit amet nisi. Etiam ornare lacus ac mi pretium,
    nec dictum est fermentum. Nulla id nibh vel lacus elementum feugiat eget nec ex. Aenean vulputate at ligula eget vehicula. Donec pulvinar neque a sollicitudin tempor.
    Duis convallis, orci at feugiat aliquet, lectus lacus fermentum dui, nec varius justo ligula ut libero. Integer scelerisque, felis ac pretium feugiat, eros ipsum venenatis est,
    at cursus nisi ligula sit amet ligula. Nam vehicula vestibulum arcu, eget ornare elit tincidunt at. Cras blandit tincidunt urna nec dictum.
    Integer sodales ante sem, sit amet ornare odio porttitor id.Sed tristique sem sed nibh gravida, at cursus lorem sagittis. 
    Mauris sit amet metus convallis, sollicitudin neque eu, auctor elit. Integer dignissim vehicula tristique. Suspendisse potenti. Integer a ante tincidunt,
    posuere dolor non, sodales velit. Ut ut orci eu nisl ornare finibus quis sit amet eros. Proin at sodales magna. Pellentesque vehicula auctor pharetra.
    Morbi convallis, ex sed malesuada congue, urna turpis posuere est, id posuere nisi nulla a enim. Proin efficitur accumsan lorem, quis sodales enim.
    Donec auctor, urna quis vulputate efficitur, mi purus congue purus, ut fringilla velit nisi sed libero. Vivamus sit amet interdum mi. Donec euismod,
    velit nec aliquam fermentum, quam odio dictum ipsum, non tincidunt felis augue quis justo.Maecenas venenatis risus sed urna sagittis blandit. 
    Donec mollis mi non libero venenatis, quis venenatis lectus eleifend. Aliquam convallis libero id malesuada fermentum. Phasellus nec scelerisque metus.
    Praesent vehicula mi nec sapien tincidunt pharetra. Morbi vulputate viverra eros, nec gravida lorem sagittis nec. Cras in leo nibh. Donec tincidunt risus id suscipit vehicula.
    Nullam at nunc nec lorem rutrum tincidunt id ut lorem. Morbi tincidunt purus sit amet magna finibus, sed luctus ante sagittis. Integer sit amet turpis eu metus fermentum auctor.
    Donec gravida nunc vel varius gravida. Nam bibendum id lacus nec accumsan. Curabitur sagittis magna nec urna tincidunt, a finibus sem ultricies.
    Nulla malesuada odio eros, quis fermentum nunc fermentum at. Mauris sodales felis sed ex fringilla luctus. Cras ac nisi non elit hendrerit sagittis vel in urna. 
    Praesent ornare nunc at quam aliquam, ut fermentum neque euismod. Vestibulum interdum nunc vitae eros volutpat, vel gravida eros iaculis. 
    Nam efficitur orci et nisi tempor, ut posuere velit malesuada. Fusce dapibus fermentum ligula, id tincidunt dolor pharetra in. Phasellus ac gravida est. 
    Proin fermentum ultricies enim, quis auctor nisl gravida nec. Vestibulum aliquam justo sed lectus interdum tincidunt. Aenean id viverra velit.Nunc ac nisl augue. 
    Integer aliquet, erat sed tincidunt vestibulum, augue ex feugiat risus, non euismod mauris lorem sed augue. Vivamus blandit quam ac lectus laoreet efficitur.
    Curabitur aliquet quam id felis dapibus, nec dapibus lorem mollis. Sed sit amet metus quis nunc lacinia consectetur. Mauris vitae turpis sed ante dictum volutpat a non nulla.
    Suspendisse a viverra tortor. Fusce malesuada consectetur nisi non bibendum. Donec scelerisque ut sem at tincidunt. Proin eu tincidunt ipsum. Cras at consequat turpis.
    Praesent finibus auctor enim. Sed feugiat lorem risus, ut dignissim orci congue at. Cras bibendum sapien ut sapien vulputate, nec sagittis libero vehicula. 
    Nam dictum nunc eu sapien accumsan, nec fringilla lacus scelerisque.Vestibulum laoreet magna et nisl tempor egestas. Phasellus porttitor metus ac felis cursus vehicula. 
    Proin malesuada leo et libero tincidunt, vitae cursus quam vulputate. Integer id faucibus felis. Curabitur euismod nulla at erat posuere consequat. Suspendisse pellentesque ex eget ligula posuere tempor.
    Nam sit amet sodales orci. Suspendisse quis nisl sed lacus pellentesque efficitur at sed arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla vitae turpis nibh.
    Ut vitae mauris risus. Integer dictum eget erat quis efficitur. Mauris pellentesque risus non nisi sollicitudin dictum. Donec pretium nec metus vitae laoreet.
    Vivamus pretium orci id arcu fringilla venenatis.Quisque varius ligula ut neque sollicitudin, et ultrices purus tristique. Vivamus condimentum velit quis tristique fringilla. 
    Mauris tincidunt lectus eu nisi vestibulum elementum. Aliquam congue nibh a felis efficitur, vel elementum urna elementum. Proin molestie lectus eu nisi malesuada tristique. 
    Praesent id dolor vitae libero rutrum auctor. Donec auctor, justo vel pellentesque iaculis, enim elit feugiat nisi, sit amet vestibulum mi orci in augue. 
    Praesent id libero bibendum, egestas sem a, rhoncus ex. Praesent nec arcu dapibus ligula molestie maximus sed nec justo. Quisque eleifend vulputate velit ac fringilla.
    Vivamus interdum euismod neque, at efficitur metus ultricies sed. Nam eleifend consectetur velit a tempor. Suspendisse fringilla nunc sit amet convallis rutrum.
    Ut at facilisis augue.Donec interdum, neque sed rutrum molestie, urna lectus molestie augue, quis ultricies velit turpis vel ante. Proin elementum scelerisque arcu a fermentum. 
    Nam lacinia volutpat sem, non pellentesque ex consectetur a. Sed molestie nisi nec auctor vehicula. Ut sed luctus justo. Integer id tempor velit. Nam eu ante eget nisi pretium faucibus.
    Suspendisse potenti. Nullam id purus sed tortor mollis facilisis vitae at enim. Sed accumsan rhoncus mi id maximus. Cras tincidunt, orci vitae malesuada venenatis, 
    felis purus bibendum neque, ut fermentum nunc ex vitae velit. Nam volutpat suscipit odio, id cursus mi facilisis quis. Integer consectetur sapien risus, nec iaculis erat cursus nec.
    Fusce euismod consequat nisi id fermentum. Sed feugiat nisl euismod turpis fringilla laoreet.
    `,
}
