<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="jQuery_Plugin_Testing.jdl.demo.index" %>
<asp:Content ID="Content1" ContentPlaceHolderID="bodyContent" runat="server">
    <div class="row">&nbsp;</div>
    <div class="row">
        <div class="col-xs-6">
            <p>To demonstrate, we're going to get a list of students with their GPA's and grades. To do this, typically you'd use jQuery.ajax or jQuery.getJSON and bind the success 
                function to the handler to build your elements on the screen. However, with large datasets, you need to break up the data, implement previous/next buttons, call the handler repeatedly, but no more.
            </p>
        </div>
        <div class="col-xs-6">
            <div class="panel panel-danger">
                <div class="panel-heading">
                    The wrong way<span class="pull-right"><button type="button" onclick="ShowStudentsWrongWay();" class="btn btn-xs btn-success"><i class="glyphicon glyphicon-play"></i></button></span>
                </div>
                <div class="panel-body">
                    <table class="table table-condensed">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Grade</th>
                                <th>GPA</th>
                            </tr>
                        </thead>
                        <tbody id="studentsWrongBody">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-6">
            <p>As you can see, this table will explode on the screen and create a mess with your layout. Let's try that again using the jQuery Table Paginator</p>
        </div>
        <div class="col-xs-6">
            <div class="panel panel-success">
                <div class="panel-heading">
                    The right way<span class="pull-right"><button type="button" onclick="ShowStudentsRightWay();" class="btn btn-xs btn-success"><i class="glyphicon glyphicon-play"></i></button></span>
                </div>
                <div class="panel-body">
                    <table id="studentsRightTable" style="table-layout:fixed" class="table table-condensed table-responsive">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Grade</th>
                                <th>GPA</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="jsContent" runat="server">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    <script src="../src/jquery.jPaginator.js"></script>
	<script>
		$(function () {


		});

		function ShowStudentsWrongWay() {

		    $('#studentsWrongBody tr').remove();
		    $.getJSON("../data/students.json", function (students) {
		        $.each(students, function (i, student) {
		            if (i < 10) {
		                $('#studentsWrongBody').append("<tr><td>" + student.first_name + "</td><td>" + student.gpa + "</td><td>" + student.grade + "</td></tr>");
		            } else {
		                $('#studentsWrongBody').append("<tr class='text-center'><td colspan='3'>... (990 more) ...</td></tr>");
		                return false;
		            }
		        });
		    });
		}

		function ShowStudentsRightWay() {

		    $('#studentsRightTable').jPaginator({
		        ajaxObj: {
		            url: '../data/students.json'
		        },
		        mappings: {
		            "first_name": "Name",
		            "gpa": "GPA",
		            "grade": "Grade"
		        },
		        autoLoad: false
		    });
		    $('#studentsRightTable').jPaginator('load');
		    $('#studentsRightTable').data('plugin_jPaginator').load();
		}
	</script>
</asp:Content>