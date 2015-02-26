<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="jQuery_Plugin_Testing.jdl.demo.index" %>
<asp:Content ID="Content1" ContentPlaceHolderID="bodyContent" runat="server">
    <div class="row">
		<div id="element"></div>
    </div>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="jsContent" runat="server">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    <script src="../src/jquery.boilerplate.js"></script>
	<script>
		$(function () {
		    $("#element").defaultPluginName({
		        propertyName: "a custom value"
		    });
		});
	</script>
</asp:Content>