<!DOCTYPE html>

<!--[if IE 8]>         <html class="ie8"> <![endif]-->
<!--[if IE 9]>         <html class="ie9 gt-ie8"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="gt-ie8 gt-ie9 not-ie"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Tables - PixelAdmin</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

    <link href="{{ URL::asset('css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ URL::asset('css/pixel-admin.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ URL::asset('css/themes.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ URL::asset('css/howmany.css') }}" rel="stylesheet" type="text/css">

    <!--[if lt IE 9]>
    <script src="{{ URL::asset('js/ie.min.js') }}"></script>
    <![endif]-->

</head>


<body class="theme-default main-menu-animated">

<script>var init = [];</script>

<div id="main-wrapper">

    <div id="main-navbar" class="navbar navbar-inverse" role="navigation">

        <div class="navbar-inner">
            <div class="navbar-header">
                <a href="index.html" class="navbar-brand">
                    Howmany
                </a>
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar-collapse"><i class="navbar-icon fa fa-bars"></i></button>

            </div>
        </div>
    </div>

    <div id="content-wrapper">

        <div class="row">
            <div class="col-sm-12">

                <!-- Javascript -->
                <script>
                    init.push(function () {
                        $('#jq-datatables-example').dataTable();
                        $('#jq-datatables-example_wrapper .table-caption').text('Some header text');
                        $('#jq-datatables-example_wrapper .dataTables_filter input').attr('placeholder', 'Search...');
                    });
                </script>
                <!-- / Javascript -->

                <div class="panel">
                    <div class="table-primary">
                        <table cellpadding="0" cellspacing="0" border="0" class="table  table-bordered" id="jq-datatables-example">
                            <thead>
                            <tr>
                                <th>지역</th>
                                <th>교회</th>
                                <th>카페</th>
                                <th>핸드폰</th>
                                <th>편의점</th>
                                <th>치킨</th>
                                <th>햄버거</th>
                                <th>피자</th>
                                <th>공인중개사</th>
                                <th>빵</th>
                                <th>중국집</th>
                                <th>PC방</th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php
                            $row = 1;
                            $handle = fopen("../public/data/data_2014.csv", "r");
                            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                                if($row != 1){
                                    $num = count($data);
                                    echo "<tr>";
                                    for ($c=0; $c < $num; $c++) {
                                        echo "<td>".$data[$c]."</td> " ;
                                    }
                                    echo "</tr>";
                                }
                                $row++;

                            }
                            fclose($handle);
                            ?>

                            </tbody>
                            <tfoot style="display: table-row-group">
                                <?php
                                $row = 1;
                                $handle = fopen("../public/data/data_2014.csv", "r");
                                while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                                    if($row == 1){
                                        $num = count($data);
                                        echo "<tr>";
                                        for ($c=0; $c < $num; $c++) {
                                            if(is_numeric($data[$c])){
                                                echo "<td>".number_format($data[$c])."</td> " ;
                                            }
                                            else{
                                                echo "<td>".$data[$c]."</td> " ;
                                            }

                                        }
                                        echo "</tr>";
                                        break;
                                    }
                                }
                                fclose($handle);
                                ?>
                            </tfoot>
                        </table>
                    </div>

                </div>
                <!-- /11. $JQUERY_DATA_TABLES -->

            </div>
        </div>

    </div> <!-- / #content-wrapper -->

</div> <!-- / #main-wrapper -->

<!-- Pixel Admin's javascripts -->
<script src="{{ URL::asset('js/jquery.min.js') }}"></script>
<script src="{{ URL::asset('js/bootstrap.min.js') }}"></script>
<script src="{{ URL::asset('js/pixel-admin.min.js') }}"></script>


<script type="text/javascript">
    init.push(function () {
        // Javascript code here
    })
    window.PixelAdmin.start(init);
</script>

</body>
</html>